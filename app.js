var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
let cors = require('cors')
const session = require('express-session')

var indexRouter = require('./src/routes/index')
var usersRouter = require('./src/routes/users')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug'
)
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
  secret: '123456',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true
  }
}))

app.use((req, res, next) => {
  res.set({
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Origin': req.headers.origin || '*',
    'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type,Access-Control-Allow-Origin',
    'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
    'Content-Type': 'application/json; charset=utf-8'
  })
  req.method === 'OPTIONS' ? res.status(204).end() : next()
})


app.use('/users', usersRouter)
// 拦截所有的请求
app.use(function (req, res, next) {
  const data = {
    code: -1,
    msg: '未登录',
    data: null
  }
  if (req.session[ 'userName' ]) {
    req.cookies[ 'userName' ] === req.session[ 'userName' ] ? next() : res.send(data)
  } else {
    res.send(data)
  }

})

app.use('/', indexRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
