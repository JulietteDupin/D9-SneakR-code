const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all sneakers
router.get('/', async (req, res) => {
  try {
    const [sneakers] = await db.query('SELECT * FROM sneakers');
    res.json(sneakers)
  } catch (err) {
    console.error('Erreur lors de la récupération des marques:', err);
    res.status(500).json({ message: 'Server error', error: err.message });

  }
});

// Get all sneaker brands
router.get('/brands', async (req, res) => {
  try {
    const [brands] = await db.query('SELECT DISTINCT brand FROM sneakers');
    res.json(brands);
  } catch (err) {
    console.error('Erreur lors de la récupération des marques:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;