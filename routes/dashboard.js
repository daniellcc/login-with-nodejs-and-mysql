const express = require('express');
const auth = require('../auth');
const router = express.Router();

router.get('/', auth.checkAuthenticated, (req, res) => {
  res.render('dashboard', {user: req.user.name});
});

module.exports = router;