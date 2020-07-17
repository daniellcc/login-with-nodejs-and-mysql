const bcrypt = require('bcrypt');
const connection = require('./DB');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

function serialization() {
  passport.serializeUser(
    (user, done) => done(null, user.id)
  );
  passport.deserializeUser((id, done) => {
    connection.query(
      'SELECT * FROM usuarios WHERE ID=?',
      id,
      (error, user) => done(null, user));
  });
}

function strategy() {
  passport.use(new localStrategy(
    { usernameField: 'email' },
    (email, password, done) => {
      connection.query(
        'SELECT * FROM usuarios WHERE email=?', email,
        async (error, user) => {
          !user
            ? done(null, false)
            : await bcrypt.compare(password, user.pass, (error, result) => {
                !result ? done(null, false) : done(null, user)
              });
        }
      );
    }
  ));

  serialization();
}

module.exports = strategy;