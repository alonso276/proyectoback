const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//!3. CORS(npm install cors)
const cors= require('cors');

/** PRUEBAS MYSQL */

//ver que tengo conexión con mi bbdd- en SQl
//  const mysql = require('mysql');

// const connection = mysql.createConnection({
//  host: 'localhost',
// user: 'root',
// password: 'root',
//  port: 8889,
// database: 'proyecto_final'
// });

//  connection.connect((error) => {
//   if (error) return console.log(error);
//   console.log('Se ha conectado correctamente');
//   connection.query('select * from usuarios', (error, rows) => {
//     if (error) return console.log(error);
//     console.log(rows);
//   });
// });

/** FIN PRUEBAS MYSQL */

//!IMPORTANTE PARA CONECTAR CON LA BASE DE DATOS
require('./dbConfig').createPool();


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

//! 1- API ROUTER
const apiRouter = require('./routes/api');
const app = express();

//!4.USING CORS HERE:
app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//!2-API ROUTER
app.use('/api', apiRouter);


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
