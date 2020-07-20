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

          if(error) {
            done(error, false, { message: 'ha ocurrido un error' }) 
          }

          if(!user) {
            done(null, false, { message: 'no se ha encontrando un usuario con ese email' })
          }
          else {
            await bcrypt.compare(password, user.pass, (error, result) => {
              if(error) done(error, false, { message: 'ha ocurrido un error' });

              !result
                ? done(null, false, { message: 'la contraseña es incorrecta' })
                : done(null, user);
            });
          }
        }
      );
    }
  ));

  serialization();
}

module.exports = strategy;