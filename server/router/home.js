module.exports = {
  path: '/',
  method: 'get',
  function: async (ctx, next) => {
    ctx.body = 'hello koa2'
  },
}