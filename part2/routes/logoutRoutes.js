// routes/logout.js
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.end();
  });
});

module.exports = router;
