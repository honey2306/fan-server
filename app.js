const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const {setHeader} = require("./src/middleware/setHeader")
const {setSession} = require("./src/middleware/session")
const {getNotFound} = require("./src/middleware/404")
const {errorHandle} = require("./src/middleware/errorHandle")
const {useRouter} = require("./src/middleware/router")

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
app.use(setHeader)
useRouter(app)
// catch 404 and forward to error handler
app.use(getNotFound)
// error handler
app.use(errorHandle)

module.exports = app
