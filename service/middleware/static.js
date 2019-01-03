// https://github.com/koajs/static
const serve = require('koa-static')
const {resolve, getDirectorys} = require('../util/common')

const StaticDirectorys = getDirectorys(resolve('service', 'public'))

module.exports = StaticDirectorys.map(item => serve(item))