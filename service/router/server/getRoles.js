const roles = require('../../util/roles')

module.exports = {
  path: '/getRoles',
  method: 'get',
  function: async (ctx, next) => {
    ctx.throw(200, {record: roles})
  },
}