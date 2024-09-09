const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM sneakers WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Sneaker not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.get('/', async (req, res) => {
    try {
      const [sneakers] = await db.query('SELECT * FROM sneakers');
      res.json(sneakers)
    } catch (err) {
      console.log(err)
    }
});

module.exports = router;