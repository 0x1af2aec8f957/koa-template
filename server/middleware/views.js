// https://github.com/queckezz/koa-views
const views = require('koa-views')
const {resolve} = require('../util/common')

module.exports = views(resolve('server', 'view'), { // Loading template engine
  extension: 'ejs',
  debug: true// process.env.NODE_ENV !== 'production',  //是否开启调试模式
})