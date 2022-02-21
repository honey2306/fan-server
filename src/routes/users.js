var express = require('express');
var router = express.Router();
const { User } = require('../model/User')

router.post('/register', async (req, res, next) => {
  const user = await User.create({
    username: req.body.username,
    password: req.body.password
  })
  res.send(user)
})

router.get('/info', async (req, res, next) => {
  const user = await User.findOne({
    _id: req.user_id  })
  res.send({
    code: 200,
    data: user
  })
})

// 获取用户列表
router.get('/list', async(req, res, next)=>{
  const user = await User.find()
  console.log(user)
  res.send({
    code: 200,
    msg: '获取成功',
    data: user
  })
})

module.exports = router;
