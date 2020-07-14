if(process.env.NODE_ENV !== 'production')
  require('dotenv').config();

const express = require('express');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const app = express();

const port = process.env.PORT || 3000;
const connection = require('./DB');
const initializePassport = require('./passport-config');

initializePassport(
  passport,
  email => connection.query('SELECT * FROM usuarios WHERE email = ?', email),
  id => connection.query('SELECT * FROM usuarios WHERE ID = ?', id)
);

app.set('view-engine', 'ejs');

app.use(express.urlencoded({extended: false}));
app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => res.render('index.ejs'));

app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));

app.listen(port, () => console.log('running'));