// https://github.com/a-s-o/koa-docs
const docs = require('koa-docs')
// https://github.com/hapijs/joi
const Joi = require('joi')

const testSchema = { // schema example
  id: Joi.number().integer(),
  name: Joi.string(),
  birthyear: Joi.number().integer().min(1).max(200),
  email: Joi.string().email({minDomainAtoms: 2}),
}

module.exports = docs.get('/docs', { // Create a path for viewing the docs (only GET method is supported)
  title: 'hello Koa API',
  version: '0.0.1',
  theme: 'simplex',    // Specify a theme from www.bootswatch.com;
                       // default is un-themed bootstrap
  routeHandlers: 'disabled'/*disabled|expanded|collapsed*/,  // Hide the route implementation code from docs
  groups: [
    {
      groupName: 'test', // string representing the name of the group
      description: '', // string that describes the group; keep this short at about 1 scentence. This is displayed in both expanded and collapsed states as well as in tooltips. This should be a simple string; no markdown
      prefix: '', // optional string to be prefixed to all route paths in this group
      extendedDescription: '', // string that supports markdown and is displayed only in when a group is being displayed in an expanded state. Make this as long as you need
      routes: [
        { // array of route specs representing the routes in this group. See below for details on route specs
          method: 'post'/*get|post|put|...*/, // required HTTP method like "get", "post", "put", etc
          path: '/test', // required string
          validate: {
            header: undefined, // object which conforms to Joi validation
            query: undefined, // object which conforms to Joi validation
            params: undefined, // object which conforms to Joi validation
            body: testSchema, // object which conforms to Joi validation
            maxBody: undefined, // max incoming body size for forms or json input
            failure: 400, // HTTP response code to use when input validation fails. default 400
            type: 'json'/*form|json|multipart*/, //  if validating the request body, this is required. either form, json or multipart
            output: undefined, // output validator object which conforms to Joi validation. if output is invalid, an HTTP 500 is returned
            continueOnError: false, //  if validation fails, this flags determines if koa-joi-router should continue processing the middleware stack or stop and respond with an error immediately. useful when you want your route to handle the error response. default false
          },
          * handler () { // required GeneratorFunction
            const test = this.request.body
            if (!test.id) this.throw(400, 'Invalid ID supplied')

            return this.request.body
          }, // required GeneratorFunction
          meta: undefined, // meta data about this route. koa-joi-router ignores this but stores it along with all other route data
        }],
    }, // ...
  ],
})