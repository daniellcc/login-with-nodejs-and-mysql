const bcrypt = require('bcrypt');
const connection = require('../DB.js');

async function registerCtrl(req, res) {
  const name = req.body.name;
  const email = req.body.email;

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

module.exports = registerCtrl;