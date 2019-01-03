const Joi = require('joi')
// https://github.com/kelektiv/node.bcrypt.js
const bcrypt = require('bcrypt')
const {Regex} = require('../../util/constant')

module.exports = {
  path: '/updateAdminUserInfo',
  method: 'post',
  roles: ['systemManagement:modify'],
  schema: {
    id: Joi.string().required(), // id
    name: Joi.string().required(), // 姓名
    email: Joi.string().email().required(),// 邮箱
    phone: Joi.string().regex(Regex.PHONE, 'phone').required(), // 手机
    password: Joi.string().min(6).max(23), // 密码
    roles: Joi.array().items(Joi.string().required()), // 权限
    explain: Joi.string().max(500) // 账户说明
  },
  function: async (ctx, next) => {
    const {password, id, account/*todo:暂不提供账号修改功能*/, ...otherInfo} = ctx.request.body

    const userInfo = await ctx.db.AdminUser.findByIdAndUpdate(id, Object.assign({},password ? {
      ...otherInfo,
      password:await bcrypt.hash(password, 5)
    } : otherInfo,{
      updateTime: Date.now()
    }))

    ctx.throw(userInfo ? 200 : 400, {record: userInfo})
  },
}