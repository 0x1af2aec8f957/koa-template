const Joi = require('joi')
// https://github.com/kelektiv/node.bcrypt.js
const bcrypt = require('bcrypt')
const {Regex} = require('../../util/constant')

module.exports = {
  path: '/deleteAdminUser',
  method: 'post',
  roles: ['systemManagement:remove'],
  schema: {
    id: Joi.string().required(), // id
  },
  function: async (ctx, next) => {
    ctx.db.AdminUser.findByIdAndDelete(ctx.request.body.id).exec()

    ctx.throw(200, {message: '账户删除成功'})
  },
}