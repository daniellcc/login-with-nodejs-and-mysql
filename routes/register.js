const express = require('express');
const router = express.Router();
const registerCtrl = require('../controllers/registerCtrl');

router.get('/', (req, res) => {
  res.render('../views/register.ejs');
});

router.post('/', registerCtrl);

module.exports = router;