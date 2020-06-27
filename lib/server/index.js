const Koa = require('koa')
const koa404Handler = require('koa-404-handler')
const koaErrorHandler = require('koa-better-error-handler')
const loggerMiddleware = require('./middleware/logger')
const viewMiddleware = require('./middleware/view')

/**
 * @private
 */
const createServer = (params = {}) => {
  const { assetPath, basePath, config } = params
  const app = new Koa()

  app.context.onerror = koaErrorHandler
  app.context.api = true

  app.use(loggerMiddleware)
  app.use(koa404Handler)
  app.use(viewMiddleware({ basePath, assetPath, config }))

  return app
}

module.exports = createServer
