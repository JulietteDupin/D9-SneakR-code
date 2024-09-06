const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', async (req, res) => {
    try {
      const [sneakers] = await db.query('SELECT * FROM sneakers');
      res.json(sneakers)
    } catch (err) {
      console.log(err)
    }
});

module.exports = router;