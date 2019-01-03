const Joi = require('joi')
// https://github.com/kelektiv/node.bcrypt.js
const bcrypt = require('bcrypt')
const {Regex} = require('../../util/constant')

module.exports = {
  path: '/deleteUser',
  method: 'post',
  roles: ['userSystem:delete'],
  schema: {
    id: Joi.string().required(), // id
  },
  function: async (ctx, next) => {
    ctx.db.User.findByIdAndDelete(ctx.request.body.id).exec()

    ctx.throw(200, {message: '用户删除成功'})
  },
}