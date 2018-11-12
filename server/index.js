// https://koajs.com/
const Koa = require('koa')
// https://github.com/koajs/compose
const compose = require('koa-compose')
// https://github.com/koajs/bodyparser
const bodyParser = require('koa-bodyparser')
// https://github.com/koajs/logger
const logger = require('koa-logger')
// const document = require('./middleware/document')
const errorHandle = require('./middleware/errorHandle')
const views = require('./middleware/views')
const statics = require('./middleware/static')
const authentication = require('./middleware/authentication')
const {SECRET} = require('./util/constant')
const config = require('../config')
const router = require('./router')
const db = require('../db')

const app = new Koa()

db && (app.context.db = db) // 创建 ctx 的原型，使用：console.log(ctx.db)

app.use(logger()).
  // use(document).
  use(errorHandle).
  use(views).
  use(compose(statics)).
  use(authentication({
    secret: SECRET, // 加密token的秘钥
    prefix: config.router.prefix, // 路由前缀
    unless: config.router.unlessPath, // 不需要验证token的路由
  })).
  use(bodyParser()).
  use(router.routes()).
  use(router.allowedMethods())

module.exports = app