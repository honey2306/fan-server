const session = require('express-session')
module.exports.setSession = () => {
  return session({
    secret: '123456',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true
    }
  })
}
