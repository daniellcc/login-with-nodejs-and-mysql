const bcrypt = require('bcrypt');
const connection = require('../DB.js');

function loginCtrl(req, res){
  const email = req.body.email;
  const password = req.body.password;

  connection.query(
    'SELECT pass FROM usuarios WHERE email = ?', email, 
    async (error, result) => {
      const hash = result[0].pass;

      await bcrypt.compare(password, hash)
        .then(aver => console.log(aver))
        .catch(error => console.error('an error ocurred comparing hash: ', error));
    });
}

module.exports = loginCtrl;