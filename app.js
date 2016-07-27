var app_info     = require('./package.json');
var fs           = require('fs');
var path         = require('path');
var express      = require('express');
var bodyParser   = require('body-parser');
var engine       = require('ejs-locals');
var http         = require('http');

/**
 * Create the application.
 */
var app = express();

/**
 * Configure the application.
 */
app.set('port', process.env.PORT);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', engine);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Configure the routes.
 */

// Common tracing and locals
app.use(function(req, res, next) {
  console.log("%s %s", req.method, req.path);
  res.locals.app_version = app_info.version;
  next();
});

// Application routes
app.use('/', require('./routes/index'));
app.use('/sorties', require('./routes/sorties'));

// Error routes
app.use(function(req, res, next) { // catch 404 and forward to error handler
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) { // development error handler (with stacktrace)
    res.status(err.status || 500);
    res.render('error', { message: err.message, error: err });
  });
} else {
  app.use(function(err, req, res, next) { // production error handler (without stacktraces)
    res.status(err.status || 500);
    res.render('error', { message: err.message, error: {} });
  });
}

/**
 * Create HTTP server.
 */
app.set('server', app.listen(process.env.PORT, function(){
  console.log("Listening on port %s at %s", process.env.PORT, process.env.IP);
}));

// Expose app
exports = module.exports = app;