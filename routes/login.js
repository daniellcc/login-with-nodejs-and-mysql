const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('login', {message: req.flash});
});

router.post('/', passport.authenticate('local', 
  {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true,
    badRequestMessage: 'llene los campos'
  })
);

module.exports = router;