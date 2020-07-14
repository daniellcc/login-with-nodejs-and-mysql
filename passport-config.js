const bcrypt = require('bcrypt');
const localStrategy = require('passport-local').Strategy;

function initializePassport(passport, userByEmail, userById) {

  async function authenticateUser(email, password, done) {
    const user = userByEmail(email);
    if(!user)
      return done(null, false, { message: 'no user' });
  
    if(await bcrypt.compare(password, user.password))
      return done(null, user);
    else
      return done(null, false, { message: 'wrong password' });
  }

  passport.use(new localStrategy({ usernameField: 'email' }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => done(null, userById(id)));
}

module.exports = initializePassport;