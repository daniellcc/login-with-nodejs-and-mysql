const express = require('express');
const router = express.Router();
const loginCtrl = require('../controllers/loginCtrl.js');

router.get('/', (req, res) => {
  res.render('login.ejs');
});

router.post('/', loginCtrl);

module.exports = router;