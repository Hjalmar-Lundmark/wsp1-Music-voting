require('dotenv').config();
const express = require('express');
const nunjucks = require('nunjucks');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');

app.use(express.static('public'))

var session = require('express-session');
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

nunjucks.configure('views', {
    autoescape: true,
    express: app,
});

app.use('/', indexRouter);
app.use('/admin', adminRouter);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

var validator = require('validator');
