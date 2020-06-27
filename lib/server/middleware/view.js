// eslint-why ctx assign
/* eslint-disable require-atomic-updates */

const path = require('path')
const { promises: fs } = require('fs')
const mime = require('mime-types')
const render = require('../../render')

/**
 * @private
 */
const viewMiddleware = (params = {}) => {
  const { basePath, config } = params
  const { state } = config
  const { template } = state
  const { readAsset } = template

  return async (ctx) => {
    const { req } = ctx
    const { url: urlParam } = req
    const url = decodeURIComponent(urlParam)
    const srcPath = path.join(basePath, url)

    try {
      const { type, src } = await readAsset(url)

      ctx.body = src
      ctx.type = type
      ctx.renderType = 'asset'
      return

    // eslint-why control flow
    /* eslint-disable-next-line no-empty */
    } catch (e) {}

    const raw = /\/raw$/u.test(srcPath)
    const renderSrcPath = raw ? path.dirname(srcPath) : srcPath

    if (raw) {
      await fs.access(renderSrcPath)

      ctx.body = await fs.readFile(renderSrcPath)
      ctx.type = mime.lookup(path.basename(renderSrcPath)) || 'text/plain'
      ctx.renderType = 'raw'
    } else {
      ctx.type = 'html'
      ctx.body = await render(renderSrcPath, config, ctx)
    }
  }
}

module.exports = viewMiddleware
