const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.post('/', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const [rows] = await db.execute('SELECT * FROM Users WHERE username = ?', [username]);
      const user = rows[0];
  
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }
  
      if (user.password_hash !== password) {
        return res.status(401).json({ message: 'Incorrect password' });
      }
  
      req.session.user = {
        id: user.user_id,
        username: user.username,
        role: user.role
      };
  
      res.json({ role: user.role });
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

module.exports = router;
