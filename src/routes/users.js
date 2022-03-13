const express = require('express');
const router = express.Router();
const {User} = require('../model/User')

router.get('/loginInfo', async (req, res) => {
  if (req.session['userName']) {
    console.log(req.session['userName'], req.cookies)
    res.send({
      code: 0,
      msg: '',
      data: {}
    })
  } else {
    res.send({
      code: -1,
      msg: '未登录',
      data: null
    })
  }
})

// 登录接口
router.post('/login', async (req, res) => {
  let {userName, passWord} = req.body
  const user = await User.findOne({
      userName,
      passWord
    }
  )
  let returnData = {
    code: 0,
    msg: '',
    data: ''
  }
  if (user) {
    req.session['userName'] = userName
    returnData.code = 0
    returnData.msg = '成功'
    returnData.data = user
  } else {
    returnData.code = -2
    returnData.msg = '用户名或者密码错误'
    returnData.data = null
  }
  res.send(returnData)
})

module.exports = router;
