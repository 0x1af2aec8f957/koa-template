const Joi = require('joi')
// https://github.com/kelektiv/node.bcrypt.js
const bcrypt = require('bcrypt')
const {Regex} = require('../util/constant')

module.exports = {
  path: '/register',
  method: 'post',
  schema: {
    phone: Joi.string().regex(Regex.PHONE, 'phone'), // Cell-phone number
    email: Joi.string().email(),// email account
    password: Joi.string().min(6).max(23).required(), // password
  },
  function: async ctx => {
    const {password, ...otherInfo} = ctx.request.body

    const user = await ctx.db.User.findOne(otherInfo)

    if (user) {
      return ctx.throw(406, {message: '用户已存在'})
    }

    const userModel = new ctx.db.User(
      {
        ...ctx.request.body,
        password: await bcrypt.hash(password, 5),
      },
    )

    // userModel.watch().on('change', change => console.log(change)) // 订阅

    const record = await userModel.save()
    ctx.throw(record ? 200 : 400, {record})
  },
}