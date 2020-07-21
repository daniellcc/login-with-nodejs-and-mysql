const express = require('express');
const bcrypt = require('bcrypt');
const connection = require('../DB');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('register');
});

router.post('/', async (req, res) =>  {
  if(req.body.name && req.body.email && req.body.password) {
    const [name, email] = [req.body.name, req.body.email];

    await bcrypt.hash(req.body.password, 10)
      .then(hashedPassword => {
        connection.query(
          'INSERT INTO usuarios VALUES (?, ?, ?, default)',
          [name, email, hashedPassword]
        );
      })
      .then(() => res.redirect('/login'))
      .catch(error => console.error('an error ocurred on hashed password: ', error));
  }
  else {
    req.flash('info', 'todos los campos son necesarios');
    res.redirect('/register');
  }
});

module.exports = router;