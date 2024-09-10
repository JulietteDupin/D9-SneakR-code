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

// Get a user by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
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
      'INSERT INTO users (firstName, lastName, email, password, stripe_customer_id) VALUES (?, ?, ?, ?, ?)',
      [firstName, lastName, email, hashedPassword, customer.id]
    );

    res.status(201).json({ id: result.insertId, firstName, lastName, email });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Update a user by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, birthdate, email, password } = req.body;

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  try {
    const [result] = await db.query(
      'UPDATE users SET firstName = ?, lastName = ?, birthdate = ?, email = ?, password = ? WHERE id = ?',
      [firstName, lastName, birthdate, email, hashedPassword, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User updated' });
  } catch (err) {
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

  console.log("update cart", cart);
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
