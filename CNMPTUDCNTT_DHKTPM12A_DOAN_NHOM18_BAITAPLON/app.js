var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

//router
var indexRouter = require('./routes/indexRouter');
var usersRouter = require('./routes/usersRouter');
var loginRouter = require('./routes/loginRouter');
var dangkiRouter = require('./routes/dangkiRouter');
var dangkidoanhnghiepRouter = require('./routes/dangkidoanhnghiepRouter');
var quanlykhachhangRouter = require('./routes/quanlykhachhangRouter');
var quanlydichvuRouter = require('./routes/quanlysdichvuRouter');
var indexdianhnghiepRouter = require('./routes/indexdoanhnghiepRouter');
var quanlyhoadonRouter = require('./routes/quanlyhoadonRouter');
var taomoihoadonRouter = require('./routes/taomoihoadonRouter');
var khachhang = require('./routes/khachhang');
var quanlydoanhnghiepRouter = require('./routes/quanlydoanhnghiepRouter');
var thanhtoan = require('./routes/thanhtoan');
var app = express();


app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}))




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',indexRouter);
app.use(usersRouter);
app.use(loginRouter);
app.use(dangkiRouter);
app.use(dangkidoanhnghiepRouter);
app.use(quanlykhachhangRouter);
app.use(quanlydichvuRouter);
app.use(indexdianhnghiepRouter);
app.use(quanlyhoadonRouter);
app.use(taomoihoadonRouter);
app.use(khachhang);
app.use(quanlydoanhnghiepRouter);
app.use(thanhtoan);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  //next(createError(404));
  res.locals.session = req.session;
    next();
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //res.render('error'); 
});

module.exports = app;
