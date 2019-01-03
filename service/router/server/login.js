const Joi = require('joi')
// https://github.com/kelektiv/node.bcrypt.js
const bcrypt = require('bcrypt')
// https://github.com/auth0/node-jsonwebtoken
const jwt = require('jsonwebtoken')
const {Regex, SECRET} = require('../../util/constant')

module.exports = {
  path: '/login',
  method: 'post',
  schema: {
    account: Joi.string().required(), // 账号
    password: Joi.string().min(6).max(23).required(), // 密码
  },
  function: async (ctx, next) => {
    const {password, account} = ctx.request.body
    const user = await ctx.db.AdminUser.findOne({account})

    if (!user) {
      return ctx.throw(400, {message: '用户不存在'})
    }

    if (user.disabled){
      return ctx.throw(406, {message: '用户被禁用'})
    }

    if (await bcrypt.compare(password, user.password)) {

      /*ctx.cookies.set( // https://github.com/pillarjs/cookies
        'userInfo',
        {userName: user.userName, photo: user.photo},
        {
          expires: new Date(Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7)),
        },
      )*/
      ctx.throw(200, {
        record: {
          userInfo: user,
          token: jwt.sign({ // decoded = jwt.verify(token, SECRET)
            data: user['_id'],
            // 设置 token 过期时间
            exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24 hour * 60 seconds * 60 minutes = 1 hour
          }, SECRET),
        },
      })
    } else {
      ctx.throw(400, {message: '密码错误'})
    }

  },
}