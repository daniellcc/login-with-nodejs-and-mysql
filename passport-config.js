const bcrypt = require('bcrypt');
const connection = require('./DB');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

function serialization() {
  try {
    passport.serializeUser(
      (user, done) => done(null, user.ID)
    );

    passport.deserializeUser((id, done) => {
      connection.query(
        'SELECT * FROM usuarios WHERE ID=?', id,
        (error, queryResult) => {
          error ? done(error) : done(null, queryResult[0]);
        });
    });
  } catch(error) {
    console.error('error on serialization: ', error);
  }
}

function strategy() {
  passport.use(new localStrategy(
    { usernameField: 'email' },
    (email, password, done) => {
      connection.query(
        'SELECT * FROM usuarios WHERE email=?', email,
        async (error, queryResult) => {
          const user = queryResult[0];

          error ? done(error) : false;

          !user
            ? done(null, false)
            : await bcrypt.compare(password, user.pass, (error, result) => {
                error ? done(error) : false;

                !result ? done(null, false) : done(null, user);
            });
        }
      );
    }
  ));

  serialization();
}

module.exports = strategy;