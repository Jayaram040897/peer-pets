require('./api/models/db');
require('./api/config/passport');

const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const passport = require('passport');
const path = require('path');

const routesApi = require('./api/routes/index');

const app = express();
const cors = require("cors");
app.options('*', cors())
app.use(cors());

// view engine setup for local
app.use('/assets',express.static(__dirname+'/client/dist/assets'));
app.use('/',express.static(__dirname+'/client/dist/'));

app.use(logger('dev'));
app.use(express.json({limit: '3mb'}));
app.use(express.urlencoded({ limit: '3mb' , extended: false }));
app.use(cookieParser());

app.use(passport.initialize());
app.use("/api", routesApi);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Catch unauthorised errors
app.use((err, req, res) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({ message: `${err.name}: ${err.message}` });
  }
});

app.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


module.exports = app;
