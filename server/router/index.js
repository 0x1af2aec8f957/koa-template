// https://github.com/alexmingoia/koa-router
const Router = require('koa-router')
const validator = require('../middleware/validator')
const {resolve, getFiles} = require('../../server/util/common')
const files = getFiles(resolve('server','router')).filter(item => !~item.indexOf('index.js'))
const routes = files.map(path => require(path))

const router = new Router()

routes.forEach(({path, method, schema, function: func}) => router[method](path, validator(schema), func))

module.exports = router