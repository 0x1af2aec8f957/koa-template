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
const router = require('./router/index')

const app = new Koa()

app.use(logger()).
  // use(document).
  use(views).
  use(compose(statics)).
  use(bodyParser()).
  use(router.routes()).
  use(router.allowedMethods())

module.exports = app