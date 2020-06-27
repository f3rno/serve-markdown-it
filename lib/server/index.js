const Koa = require('koa')
const koa404Handler = require('koa-404-handler')
const koaErrorHandler = require('koa-better-error-handler')
const loggerMiddleware = require('./middleware/logger')
const viewMiddleware = require('./middleware/view')

/**
 * @external koa
 * @see https://github.com/koajs/koa
 */

/**
 * Starts an HTTP server on the configured port, and serves static files out of
 * the specified `basePath`. If the `basePath` is a file, only that file will
 * be rendered, excluding any resolved assets.
 *
 * Files provided by the configured template are rendered from disk. Any URLs
 * ending in `/raw` have the suffix removed and cause any matching file in
 * `basePath` to be rendered like an asset. This allows file contents to be
 * rendered with a link to the file itself.
 *
 * If a URL is not an asset or raw file, it is checked against the
 * `matchMarkdownFileNames` regex on the provided {@link Config} object. Files
 * that match are passed through `markdown-it`.
 *
 * Any remaining URLs are assumed to map to the `basePath`; if they are files,
 * they are rendered as source within markdown code fences. Directories trigger
 * the file explorer if allowed by the configuration.
 *
 * @param {object} params - params.
 * @param {string} params.basePath - absolute path to the root content
 *   directory.
 * @param {Config} params.config - config data.
 * @returns {Promise} p - resolves to {@link external:koa} instance.
 *
 * @example
 * const SERVE_HANDLER = async (argv) => {
 *   const { l, port, config, path } = argv
 *   const server = await createServer({ basePath: path, config })
 *
 *   server.listen(port)
 *
 *   l.star('serving content from %s', colors.underline(path))
 *   l.star(
 *     '%s',
 *     colors.cyan.underline(
 *       `listening at ${colors.bold(`http://localhost:${port}`)}`
 *     )
 *   )
 * }
 */
const createServer = async (params) => {
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
