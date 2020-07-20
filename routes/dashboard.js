const express = require('express');
const connection = require('../DB');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('dashboard', {user: req.user.name});
});

router.get('/logout', (req, res) => {
  req.logOut();
  res.clearCookie('connect.sid');
  res.redirect('/login');
});

module.exports = router;