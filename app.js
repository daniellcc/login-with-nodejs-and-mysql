if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');

const strategy = require('./passport-config');
const app = express();

const port = process.env.PORT || 3000;
const checkAuth = (req, res, next) => {
  req.isAuthenticated() ? next() : res.redirect('/');
}

strategy();

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false}));
app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => res.render('index'));


app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));
app.use('/dashboard', checkAuth, require('./routes/dashboard'));

app.listen(port, () => console.log('running'));