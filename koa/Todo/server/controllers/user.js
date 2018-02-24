const user = require('../models/user.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const getUserInfo = async function(ctx) {
  const id = ctx.params.id
  const result = await user.getUserById(id)
  ctx.body = result
}

const postUserAuth = async function(ctx) {
  const data = ctx.request.body
  const userInfo = await user.getUserByName(data.name)
  if (userInfo) {
  	if (userInfo.password !== data.password) {
  	  ctx.body = {
  	  	success: false,
  	  	info: '密码错误!'
  	  }
  	} else {
  	  const userToken = {
  	  	name: userInfo.user_name,
  	  	id: userInfo.id
  	  }
  	  const secret = 'vue-koa-demo'
  	  const token = jwt.sign(userToken, secret)
  	  ctx.body = {
  	  	success: true,
  	  	token: token
  	  }
  	}
  } else {
  	ctx.body = {
  	  success: false,
  	  info: '用户不存在!'
  	}
  }
}

module.exports = {
  getUserInfo,
  postUserAuth
}