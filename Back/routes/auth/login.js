const express = require('express');
const router = express.Router();
const db = require('../../config/db');
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const saltRounds = 10; 
     try {
        const result = db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, hashedPassword], (err, results) => {  
            if (results.length > 0) {
                bcrypt.compare(password, result.password, function(err, result) {
                    console.log(result)
                    if (result = true) {
                        localStorage.setItem('isAuthenticated', true);
                        alert('Login succeeded')
                    }
                });
                //  const user = results[0];
                
            };
        })
    } catch(err) {
        alert('Invalid credentials');
        console.error(err)
        throw err;
    }
});

module.exports = router;

