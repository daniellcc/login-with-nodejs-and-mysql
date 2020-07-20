if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const passport = require('passport');
const session = require('express-session');
const flash = require('express-flash');

const auth = require('./auth');
const strategy = require('./passport-config');

const app = express();
const port = process.env.PORT || 3000;

strategy();

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false}));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.get('/', auth.checkAuth, (req, res) => res.render('index'));

app.use('/register', auth.checkAuth, require('./routes/register'));
app.use('/login', auth.checkAuth, require('./routes/login'));
app.use('/dashboard', auth.checkUnauth, require('./routes/dashboard'));

app.listen(port, () => console.log('running'));