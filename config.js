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
    prefix: '/test', // Routing prefix
    unlessPath: [/^\/$/, /\/register$/, /\/login$/, /^\/public/], // No need for token path
  },
}