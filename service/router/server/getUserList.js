const Joi = require('joi')
// https://github.com/kelektiv/node.bcrypt.js
const bcrypt = require('bcrypt')
const {Regex} = require('../../util/constant')

module.exports = {
  path: '/getUserList',
  method: 'get',
  roles: ['userSystem:obtain'],
  function: async (ctx, next) => {
    const record = await ctx.db.User.find()
    ctx.throw(200, {record})
  },
}