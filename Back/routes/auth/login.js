const express = require('express');
const router = express.Router();
const db = require('../../config/db');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    const { email, password } = req.body;
    const saltRounds = 10; 
    try {
        const result = await db.query('SELECT * FROM users WHERE email = ?', [email])
        if (result.length > 0) {
            bcrypt.compare(password, result.password, function(err, result) {
                if (result = true) {
                    res.status(201).json({ id: result.insertId, email });
                }
            });
            //  const user = results[0];
            
        };
    } catch(err) {
        console.error(err)
        res.status(500).json({ message: 'Server error', error: err.message });
        throw err;
    }
});

module.exports = router;

