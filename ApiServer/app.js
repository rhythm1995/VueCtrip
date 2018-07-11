var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var flight = require('./routes/flight');
var login = require('./routes/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));


app.use('/', index);
app.use('/users', users);
app.use('/flight',flight);
app.use('/login',login);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//渲染模板
app.get('/', function (req, res) {
    res.render('index', { title: 'Hey', message: 'Hello there!'});
});

app.get('/flightadmin', function (req, res) {
    res.render('flightadmin', { title: 'Hey', message: 'Hello there!'});
});

app.get('/useradmin', function (req, res) {
    res.render('useradmin', { title: 'Hey', message: 'Hello there!'});
});

app.get('/companyadmin', function (req, res) {
    res.render('companyadmin', { title: 'Hey', message: 'Hello there!'});
});

app.get('/login', function (req, res) {
    res.render('login', { title: 'Hey', message: 'Hello there!'});
});

module.exports = app;
