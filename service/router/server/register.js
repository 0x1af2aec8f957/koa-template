const Joi = require('joi')
// https://github.com/kelektiv/node.bcrypt.js
const bcrypt = require('bcrypt')
const {Regex} = require('../../util/constant')

module.exports = {
  path: '/register',
  method: 'post',
  roles: ['userSystem:create'],
  schema: {
    account: Joi.string().required(), // 手机
    name: Joi.string().required(), // 姓名
    email: Joi.string().email().required(),// 邮箱
    phone: Joi.string().regex(Regex.PHONE, 'phone').required(), // 手机
    password: Joi.string().min(6).max(23).required(), // 密码
    roles: Joi.array().items(Joi.string().required()), // 权限
    explain: Joi.string().max(500) // 账户说明
  },
  function: async (ctx, next) => {
    const {password, account, ...otherInfo} = ctx.request.body

    const user = await ctx.db.AdminUser.findOne({account})

    if (user) {
      return ctx.throw(406, {message: '账户已存在'})
    }

    const userModel = new ctx.db.AdminUser(
      {
        ...otherInfo,
        createTime: new Date(),
        account,
        password: await bcrypt.hash(password, 5),
      },
    )

    const record = await userModel.save()
    ctx.throw(record ? 200 : 400, {record})
  },
}