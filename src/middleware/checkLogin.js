module.exports.checkLogin =  (req, res, next) => {
  if (req.session.userNmae) {
    next()
  } else {
    res.send({
      code: -1,
      msg: '未登录',
      data: null
    })
  }
}
