var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

const headers = require('./appHeaders');

// Add headers
app.use(function (req, res, next) {
  headers.forEach(function (item) {
    (item.active) ? res.setHeader(item.role, item.value) : undefined;
  })
  next();
});

// middleware that is specific to this router
app.use(function timeLog(req, res, next) {

  console.log("MIDDLEWARE-headers: " + JSON.stringify(req.headers)) //! APAGAR
  console.log("MIDDLEWARE-body: " + JSON.stringify(req.body)) //! APAGAR
  console.log("MIDDLEWARE-file: " + JSON.stringify(req.file)) //! APAGAR
  console.log("MIDDLEWARE-files: " + JSON.stringify(req.files)) //! APAGAR

  console.log('\nTime: ', new Date);
  next();
});

require('./appFeatures')(app);

require('./appIni')(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log("res.locals.error", res.locals.error);

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// require('./bin/script_pee') //! REMOVER

module.exports = app;
