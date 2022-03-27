const express = require('express');
const router = express.Router();
const User = require('../../model/user/User')
const initData = require('../../utils/returnData')

router.get('/loginInfo', async (req, res) => {
  const returnData = {...initData}
  if (req.session.isLogin) {
    returnData.data = {
      userName: req.session.userNmae,
      name: req.session.name
    }
  } else {
    returnData.code = -1
    returnData.msg = '未登录'
  }
  res.send(returnData)
})

// 登录接口
router.post('/login', async (req, res) => {
  const returnData = {...initData}
  let {userName, passWord} = req.body
  const user = await User.findOne({
      userName,
      passWord
    }
  )
  if (user) {
    req.session.isLogin = true
    req.session.userNmae = userName
    req.session.name = user.name
    returnData.code = 0
    returnData.msg = '成功'
  } else {
    returnData.code = -2
    returnData.msg = '用户名或者密码错误'
  }
  res.send(returnData)
})

router.get('/logout', (req, res, next) => {
  const returnData = {...initData}
  req.session.isLogin = null
  res.send(returnData)
})

module.exports = router;
