// https://koajs.com/
const Koa = require('koa')
// https://github.com/koajs/compose
const compose = require('koa-compose')
// https://github.com/koajs/bodyparser
const bodyParser = require('koa-bodyparser')
// https://github.com/koajs/logger
const logger = require('koa-logger')
// const document = require('./middleware/document')
const views = require('./middleware/views')
const statics = require('./middleware/static')
const router = require('./router')
const db = require('../db')

const app = new Koa()

db && (app.context.db = db) // 创建 ctx 的原型，使用：console.log(ctx.db)

app.use(logger()).
  // use(document).
  use(views).
  use(compose(statics)).
  use(bodyParser()).
  use(router.routes()).
  use(router.allowedMethods())

module.exports = app