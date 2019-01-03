const Joi = require('joi')
// https://github.com/kelektiv/node.bcrypt.js
const bcrypt = require('bcrypt')
const {Regex} = require('../../util/constant')

module.exports = {
  path: '/disabledAdminUser',
  method: 'post',
  roles: ['systemManagement:disabled'],
  schema: {
    id: Joi.string().required(), // id
  },
  function: async (ctx, next) => {
    const userInfo = await ctx.db.AdminUser.findById(ctx.request.body.id)

    userInfo.disabled = !userInfo.disabled
    const record = await userInfo.save()
    ctx.throw(record ? 200 : 400, {record})
  },
}