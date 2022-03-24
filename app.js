const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const indexRouter = require('./src/routes/index')
const usersRouter = require('./src/routes/users')
const uploadRouter = require('./src/routes/upload')
const technologyRouter = require('./src/routes/technology/index')
const TecType = require('./src/routes/technology/type')
const {checkLogin} = require("./src/middleware/checkLogin")
const {setHeader} = require("./src/middleware/setHeader")
const {setSession} = require("./src/middleware/session")
const {getNotFound} = require("./src/middleware/404")
const {errorHandle} = require("./src/middleware/errorHandle")

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(express.static('statics'))
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(setSession())
app.use(setHeader) // 登录相关的不需要验证是否登录
app.use('/users', usersRouter)
app.use('/', uploadRouter)
app.use('/', TecType)
app.use('/', technologyRouter)
//app.use(checkLogin)
app.use('/', indexRouter)
// catch 404 and forward to error handler
app.use(getNotFound)
// error handler
app.use(errorHandle)

module.exports = app
