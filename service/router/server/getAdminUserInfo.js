const Joi = require('joi')
// https://github.com/kelektiv/node.bcrypt.js
const bcrypt = require('bcrypt')
const {Regex} = require('../../util/constant')

module.exports = {
  path: '/getAdminUserInfo',
  method: 'get',
  roles : ['systemManagement:obtain'],
  function: async (ctx, next) => {
    const record = await ctx.db.AdminUser.findById(ctx.request.query.id,'-password -__v')
    ctx.throw(200, {record})
  },
}