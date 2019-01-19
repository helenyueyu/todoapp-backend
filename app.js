var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
var bluebird = require('bluebird')

var app = express();

// Added bluebird and mongoose
mongoose.Promise = bluebird

mongoose.connect('mongodb://127.0.0.1:27017/todoapp', { useMongoClient: true })
  .then(()=> { console.log('Successfully connected to MongoDB database.') })
  .catch(() => { console.log('Error in connecting to MongoDB database.') })

// Manipulate CORS so this website can run on PORT: 4200
app.use(function(req, res, next){
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  next()
})




var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// Get API route
var api = require('./routes/api.route')


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Use API router
app.use('/api', api)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
