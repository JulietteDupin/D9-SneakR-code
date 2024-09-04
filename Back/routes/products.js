const express = require('express');
const router = express.Router();
const { getSneakers } = require('../api');
const sneakersJson = require('../sneakers.json')
 
router.get('/', async (req, res) => {
    try {
        getSneakers();
        const sneakers = JSON.stringify(sneakersJson);
        console.log(sneakers);
        return sneakers;
    } catch (err) {
      res.status(500).json({ message: 'Failed to retreive the products from the API', error: err.message });
    }
  });

module.exports = router ;