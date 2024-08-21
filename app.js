var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var paywallRouter = require('./routes/paywall');
var clientSecretRouter = require('./routes/clientSecret');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/paywall', paywallRouter);
app.use('/clientSecret', clientSecretRouter);

express.static.mime.define({'video/mp4': ['mp4']})

module.exports = app;
