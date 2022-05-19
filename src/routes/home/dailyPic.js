const express = require('express');
const router = express.Router();
const initData = require('../../utils/returnData')
const request = require('request')
const {response} = require("express");

router.get('/home/dailyPic', async (req, res) => {
  const returnData = {...initData}
  request({
    url: 'https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1',
    method: 'get',
    headers: {
      'Content-Type': 'text/json'
    }
  }, (err, response, body) => {
    if (!err && response.statusCode === 200) {
      const imgData = JSON.parse(body).images[0]
      returnData.data = {
        url: 'https://www.bing.com/' + imgData.url,
        title: imgData.title,
        content: imgData.copyright.split('(')[0]
      }
    } else {
      returnData.code = -2
      returnData.msg = '获取每日图片失败'
    }
    res.send(returnData)
  })
})

module.exports = router;
