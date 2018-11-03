// https://github.com/alexmingoia/koa-router
const Router = require('koa-router')
const db = require('../../db/index')

const router = new Router()
const routes = [
  require('./home'),
  require('./pushCode'),
]

db.main && db.main()

routes.forEach(({path, method, function: func}) => router[method](path, func))

module.exports = router