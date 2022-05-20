const express = require('express');
const router = express.Router();
const initData = require('../../utils/returnData')
const request = require('request')
const {response} = require("express");

router.get('/home/dailyPic', async (req, res) => {
  const returnData = {...initData}
  request({
    url: 'https://apier.youngam.cn/essay/one',
    method: 'get',
    headers: {
      'Content-Type': 'text/json'
    }
  }, (err, response, body) => {
    if (!err && response.statusCode === 200) {
      const data = JSON.parse(body).dataList
      const index = Math.floor(Math.random() * data.length)
      returnData.data = {
        ...data[index]
      }
    } else {
      returnData.code = -2
      returnData.msg = '获取每日图片失败'
    }
    res.send(returnData)
  })
})

module.exports = router;
