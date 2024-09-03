const express = require('express');
const router = express.Router();
const db = require('../../config/db');
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, results) => {  
            if (results.length > 0) {
                //  const user = results[0];
                localStorage.setItem('isAuthenticated', true);
                alert('Login succeeded')
            };
        })
    } catch(err) {
        alert('Invalid credentials');
        console.error(err)
        throw err;
    }
});

module.exports = router;

