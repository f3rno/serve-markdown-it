const Koa = require('koa')
const koa404Handler = require('koa-404-handler')
const koaErrorHandler = require('koa-better-error-handler')
const loggerMiddleware = require('./middleware/logger')
const viewMiddleware = require('./middleware/view')

/**
 * @private
 */
const createServer = async (params = {}) => {
  const { basePath, config } = params
  const app = new Koa()
  const viewHandler = await viewMiddleware({ basePath, config })

  app.context.onerror = koaErrorHandler
  app.context.api = true

  app.use(loggerMiddleware)
  app.use(koa404Handler)
  app.use(viewHandler)

  return app
}

module.exports = createServer
