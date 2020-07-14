const bcrypt = require('bcrypt');
const connection = require('../DB.js');

const passport = require('passport');

function loginCtrl(req, res){
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  });
}

module.exports = loginCtrl;