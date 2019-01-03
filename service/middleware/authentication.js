const jwt = require('jsonwebtoken')

module.exports = ({secret, unless, prefix}) => {
  // koa-router middleware
  // Verification token
  return (ctx, next) => {

    const {token} = ctx.request.header
    // invalid token - synchronous
    if (!unless.some(path => new RegExp(path, 'g').
        test(ctx.request.path.replace(prefix, '')))) {
          try {
            ctx.userId = jwt.verify(token, secret).data
          } catch (err) {
            return ctx.throw(401, {message: '无效的访问凭证，请登录'})
          }
        }

    return next()
  }

}