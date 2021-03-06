const footPrint = require('../routes/footPrint/footPrint')
const usersRouter = require("../routes/user/users")
const uploadRouter = require("../routes/utils/upload")
const TecType = require("../routes/technology/type")
const technologyRouter = require("../routes/technology")
const map = require("../routes/utils/mapAPI")
const Travel = require("../routes/travel/travel")
const dalyPic = require("../routes/home/dailyPic")
const blog = require("../routes/frontPage/technology/index")
const {checkLogin} = require("./checkLogin")

module.exports.useRouter = (app) => {
  app.use('/users', usersRouter)
  //app.use(checkLogin)
  app.use('/', uploadRouter)
  app.use('/', TecType)
  app.use('/', technologyRouter)
  app.use('/', footPrint)
  app.use('/', map)
  app.use('/', Travel)
  app.use('/', dalyPic)

  // 前台接口
  app.use('/', blog)
}
