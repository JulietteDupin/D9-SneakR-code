const express = require('express');
const router = express.Router();
const db = require('../../config/db');
const bcrypt = require('bcrypt');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

// Get all users
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get a user by ID, including preferences
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query(`
      SELECT 
        u.id, 
        u.firstname, 
        u.lastname, 
        u.email, 
        u.birthdate, 
        up.shoe_size AS size, 
        up.favorite_brand AS favoriteCategory
      FROM users u
      LEFT JOIN user_preferences up ON u.id = up.user_id
      WHERE u.id = ?
    `, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Create a new user
router.post('/', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  try {
    const [existingUser] = await db.query('SELECT email FROM users WHERE email = ?', [email]);

    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const customer = await stripe.customers.create({
      name: firstName + " " + lastName,
      email: email,
    });

    const [result] = await db.query(
      'INSERT INTO users (firstName, lastName, email, password, stripe_customer_id, isAdmin) VALUES (?, ?, ?, ?, ?, ?)',
      [firstName, lastName, email, hashedPassword, customer.id, 1]
    );

    res.status(201).json({ id: result.insertId, firstName, lastName, email });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Update a user by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, birthdate, email, password, size, favoriteCategory } = req.body;

  let hashedPassword;
  if (password) {
    const saltRounds = 10;
    hashedPassword = await bcrypt.hash(password, saltRounds);
  }

  try {
    if (firstName || lastName || birthdate || email || password) {

      let sql = `UPDATE users SET firstname = ?, lastname = ?, birthdate = ?, email = ?`;
      let params = [firstName, lastName, birthdate, email];

      if (hashedPassword) {
        sql += `, password = ?`;
        params.push(hashedPassword);
      }

      sql += ` WHERE id = ?`;
      params.push(id);

      await db.query(sql, params);
      console.log('Mise à jour de la table users effectuée');
    }

    if (size || favoriteCategory) {

      const [rows] = await db.query(`SELECT * FROM user_preferences WHERE user_id = ?`, [id]);

      if (rows.length > 0) {

        await db.query(
          `UPDATE user_preferences SET shoe_size = ?, favorite_brand = ? WHERE user_id = ?`,
          [size, favoriteCategory, id]
        );
      } else {
        await db.query(
          `INSERT INTO user_preferences (user_id, shoe_size, favorite_brand) VALUES (?, ?, ?)`,
          [id, size, favoriteCategory]
        );
      }

      console.log('Mise à jour de la table user_preferences effectuée');
    }

    res.json({ message: 'User and/or preferences updated' });
  } catch (err) {
    console.error('Erreur lors de la mise à jour de l\'utilisateur ou des préférences:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


// Delete a user by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Cart management
router.put('/cart/:id', async (req, res) => {
  const { id } = req.params;
  const { cart } = req.body;

  try {
    const [result] = await db.query(
      'UPDATE users SET cart = ? WHERE id = ?',
      [JSON.stringify(cart), id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User updated' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


module.exports = router;
