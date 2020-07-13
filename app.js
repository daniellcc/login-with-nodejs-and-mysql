const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.set('view-engine', 'ejs');
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => res.render('index.ejs'));

app.use('/register', require('./routes/register'));

app.use('/login', require('./routes/login'));

app.listen(port, () => console.log('running'));