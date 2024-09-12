const express = require('express');
const router = express.Router();
const db = require('../../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

router.post('/', (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email])
        .then(result => {
            if (result.length > 0) {
                const user = result[0][0];
                
                bcrypt.compare(password, user.password)
                    .then(passwordMatch => {
                        if (passwordMatch) {
                            const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

                            res.status(200).json({
                                token,
                                user: { id: user.id, email: user.email, isAdmin: user.isAdmin }
                            });
                        } else {
                            res.status(401).json({ message: 'Invalid email/password combination' });
                        }
                    })
                    .catch(err => {
                        console.error('Erreur lors de la comparaison des mots de passe', err);
                        res.status(500).json({ message: 'Server error', error: err.message });
                    });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        })
        .catch(err => {
            console.error('Erreur lors de la requête à la base de données', err);
            res.status(500).json({ message: 'Server error', error: err.message });
        });
});

module.exports = router;
