const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  req.logOut();
  req.session.destroy(error => {
    error ? console.error('error on log out: ', error) 
          : res.redirect('/login');   
  });
});

module.exports = router;