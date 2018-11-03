// https://github.com/alexmingoia/koa-router
const Router = require('koa-router')
const validator = require('../middleware/validator')

const router = new Router()
const routes = [
  require('./home'),
  require('./pushCode'),
]

routes.forEach(({path, method, schema, function: func}) => router[method](path, validator(schema), func))

module.exports = router