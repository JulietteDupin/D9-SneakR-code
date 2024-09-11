const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const db = require('../config/db');

require('dotenv').config();

router.post('/', async (req, res) => {
  const { email } = req.body;

  try {
    const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    if (!user || user.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userId = user[0].id;
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = await bcrypt.hash(resetToken, 10);
    const tokenExpiration = Date.now() + 3600000;

    const [existingReset] = await db.query('SELECT * FROM user_reset WHERE user_id = ?', [userId]);

    if (existingReset.length > 0) {
      await db.query(
        'UPDATE user_reset SET reset_password_token = ?, reset_token_expires = ? WHERE user_id = ?',
        [hashedToken, tokenExpiration, userId]
      );
    } else {
      await db.query(
        'INSERT INTO user_reset (user_id, reset_password_token, reset_token_expires) VALUES (?, ?, ?)',
        [userId, hashedToken, tokenExpiration]
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const resetUrl = `${process.env.VITE_APP_CLIENT_URL}/reset-password/${resetToken}`;
    const mailOptions = {
      to: email,
      subject: 'Password Reset Request',
      text: `You requested a password reset. Click this link to reset your password: ${resetUrl}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Reset password email sent' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update password
router.post('/:token', async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const [resetRequest] = await db.query('SELECT * FROM user_reset WHERE reset_password_token IS NOT NULL');

    if (resetRequest.length === 0) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    const validToken = resetRequest.find(async (entry) => await bcrypt.compare(token, entry.reset_password_token));

    if (!validToken) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    const userId = validToken.user_id;
    const tokenExpiration = validToken.reset_token_expires;

    if (Date.now() > tokenExpiration) {
      return res.status(400).json({ message: 'Token has expired' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    await db.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, userId]);

    // Delete the reset token entry
    await db.query('DELETE FROM user_reset WHERE user_id = ?', [userId]);

    res.status(200).json({ message: 'Password successfully reset' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
