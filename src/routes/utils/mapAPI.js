const express = require('express');
const router = express.Router();
const initData = require('../../utils/returnData')
const request = require('request')
const {response} = require("express");

router.get('/map/city', async (req, res) => {
  const returnData = {...initData}
  request({
    url: 'https://restapi.amap.com/v3/config/district?subdistrict=2&key=546087a5000d2e5ad1ff3d767b2168e6',
    method: 'get',
    headers: {
      'Content-Type': 'text/json'
    }
  }, (err, response, body) => {
    if (!err && response.statusCode === 200) {
      const data = JSON.parse(body).districts[0].districts
      const adCodeList = []
      const options = data.map((item) => {
        adCodeList.push(item.adcode)
        const children = item.districts.map((item1) => {
          return {
            value: item1.adcode,
            label: item1.name,
            center: item1.center,
          }
        })
        return {
          value: item.adcode,
          label: item.name,
          children: children
        }
      })
      returnData.data = {
        options,
        adCodeList
      }
      res.send(returnData)
    } else {
      returnData.code = -2
      returnData.msg = '获取省市信息失败'
      res.send(returnData)
    }
  })
})

router.get('/map/search', async (req, res) => {
  const returnData = {...initData}
  const keywords = encodeURI(req.query.keywords)
  const types = encodeURI('地名地址信息|风景名胜')
  request({
    url: `https://restapi.amap.com/v5/place/text?key=546087a5000d2e5ad1ff3d767b2168e6&types=${types}&keywords=${keywords}`,
    method: 'get',
    headers: {
      'Content-Type': 'text/json'
    }
  }, (err, response, body) => {
    if (!err && response.statusCode === 200) {
      returnData.data = JSON.parse(body).pois
      res.send(returnData)
    } else {
      console.log(err)
      returnData.code = -2
      returnData.msg = '获取搜索信息失败'
      res.send(returnData)
    }
  })
})

module.exports = router;
