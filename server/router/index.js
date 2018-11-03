// https://github.com/alexmingoia/koa-router
const Router = require('koa-router')
const validator = require('../middleware/validator')
const db = require('../../db/index')

const router = new Router()
const routes = [
  require('./home'),
  require('./pushCode'),
]

db.main && db.main()

routes.forEach(({path, method, schema, function: func}) => router[method](path, validator(schema), func))

module.exports = router