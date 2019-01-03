// https://github.com/alexmingoia/koa-router
const Router = require('koa-router')
const {router: routerConfig = {}} = require('../../config')
const validator = require('../middleware/validator')
const authorization = require('../middleware/authorization')
const {resolve, getFiles} = require('../util/common')
const filesClient = getFiles(resolve('service', 'router', 'client')) // .filter(item => !~item.indexOf('index.js'))
const filesServer = getFiles(resolve('service', 'router', 'server')) // .filter(item => !~item.indexOf('index.js'))
const routesClient = filesClient.map(path => require(path))
const routesServer = filesServer.map(path => require(path))

const routerClient = new Router(/* routerConfig.client */)
const routerServer = new Router(/* routerConfig.server */)

routesClient.forEach(({path, method, schema, function: func}) => routerClient[method](path, validator(schema), func))
routesServer.forEach(({path, method, schema, function: func, roles}) => routerServer[method](path, authorization(roles), validator(schema), func))

const router = new Router()

router.
  use(routerConfig.client.prefix, routerClient.routes(), routerClient.allowedMethods()).
  use(routerConfig.server.prefix, routerServer.routes(), routerServer.allowedMethods())

module.exports = router