var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const flash = require("express-flash");
const session = require("express-session");
const fileupload = require("express-fileupload");



// routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
var adminRouter = require('./routes/admin');
var categoryRouter = require('./routes/category');
var bookRouter = require('./routes/book');
var issuebookRouter = require('./routes/issuebook');
const returnbook = require('./routes/returnbook');
const settingsRouter = require('./routes/settings');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//use packages

app.use(session({
  name: "my_session",
  secret: "my_secret",
  resave: false
}));
app.use(flash());

app.use(fileupload({
  createParentPath: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// admin route adding assets
app.use("/admin", express.static(path.join(__dirname, 'public')));
app.use("/admin/:any", express.static(path.join(__dirname, 'public')));

// router use...
app.use('/', indexRouter);
app.use('/admin', usersRouter);
app.use('/', adminRouter);
app.use('/', categoryRouter);
app.use('/admin', bookRouter);
app.use('/admin', issuebookRouter);
app.use('/admin', returnbook);
app.use('/admin', settingsRouter);




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
