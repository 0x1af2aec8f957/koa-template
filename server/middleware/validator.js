// https://github.com/hapijs/joi
const Joi = require('joi')

module.exports = (schema = Joi.any(), data, status = 400) => {
  // koa-router middleware
  // Schema is undefined，allow all
  const {validate} = Joi
  return (ctx, next) => {
    const {method} = ctx.request
    const record = ctx.request[method === 'POST' ? 'body' : 'query']
    const {error/*, value*/} = validate(record, schema)
    if (error) return ctx.throw(status, error)
    return next()
  }
}