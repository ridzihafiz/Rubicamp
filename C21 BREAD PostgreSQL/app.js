const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { Pool } = require('pg')

// Cara 1 panggil data dari DB
// var connectionString = "postgres://postgres:ridzi!@@127.0.0.1:5432/DBChallange21";
// const pool = new Pool({
//     connectionString: connectionString,
// })

var app = express();

// Cara 2 panggil data dari DB
const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  database: 'DBChallange21',
  password: 'ridzi!@',
  port: 5432
});

var indexRouter = require('./routes/index') (pool);
var usersRouter = require('./routes/users');


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

// app.get('/', function (req, res) {
//   sql = `SELECT * FROM TableC21`
  
//   pool.query(sql, (err, rows) => {
//     console.log(rows);
    
//     res.render('list', { data: rows })
//     // client.end()
//   });
// });


module.exports = app;