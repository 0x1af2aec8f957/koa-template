const Joi = require('joi')
const {Regex} = require('../../util/constant')

module.exports = {
  path: '/updateUserDetails',
  method: 'post',
  schema: {
    userName: Joi.string(), // 用户名
    sex: Joi.number().min(0).max(1), // 性别 [0-男,1-女]
    birthday: Joi.date(), // 生日
    photo: Joi.string().uri(), // 头像
    phone: Joi.string().regex(Regex.PHONE, 'phone'), // 手机
    email: Joi.string().email(),// 邮箱
    address: Joi.string(), // 所在地
    personalProfile: Joi.string().max(150), // 个人简介
    password: Joi.string().min(6).max(23), // 密码
  },
  function: async (ctx, next) => {
    const userInfo = await ctx.db.User.findByIdAndUpdate(ctx.userId, {
      ...ctx.request.body,
      updateTime: Date.now(),
    }, {new: true/* 返回新的文档 */})

    ctx.throw(userInfo ? 200 : 400, {record: userInfo})
  },
}