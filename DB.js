const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'logindb'
});

connection.connect(err => {
  if(err) console.error('error connection: ' + err.stack);

  console.log('connected to mysql db');
});

module.exports = connection;