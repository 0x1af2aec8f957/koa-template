/* roles使用参数说明
 * @params roles = [role,]
 **/

module.exports = (roles = [], status = 426) => {
  // koa-router middleware
  // authorization check
  // Use only after token validation has passed
  return async (ctx, next) => {
    const userInfo = await ctx.db.AdminUser.findById(ctx.userId)
    return roles.every(role => userInfo.roles.includes(role)) ? next() : ctx.throw(status, {message: '你没有足够的权限处理本次请求，请联系管理员提升账户权限！'})
  }
}