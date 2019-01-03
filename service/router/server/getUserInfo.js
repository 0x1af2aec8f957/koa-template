const Joi = require('joi')

module.exports = {
  path: '/getUserDetails',
  method: 'get',
  roles: ['userSystem:obtain'],
  schema: {
    id: Joi.string().required(), // id
  },
  function: async (ctx, next) => {
    const record = await ctx.db.User.findById(ctx.request.query.id)
    ctx.throw(record ? 200 : 500, {record})
  },
}