// base config

module.exports = {
  /*db: { // Database configuration
    user: '',
    pass: '',
    dbName: '',
    poolSize: 5,
    host: '',
    port: '',
    database: '',
    autoIndex: false,
    keepAlive: true,
  },*/
  router: {
    client: {
      prefix: '/test',
      unlessPath: [/\/register$/, /\/login$/, /\/getCode$/, /^\/public/, /\/authorization$/],
    },
    server: {
      prefix: '/admin',
      unlessPath: [/\/login$/, /^\/public/,/\/getCode$/],
    },
  },
}