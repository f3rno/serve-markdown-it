// eslint-why ctx assign
/* eslint-disable require-atomic-updates */

const path = require('path')
const { promises: fs } = require('fs')
const mime = require('mime-types')
const renderContent = require('../../render/content')

/**
 * @private
 */
const viewMiddleware = (params = {}) => {
  const { basePath, assetPath, config } = params

  return async (ctx) => {
    const { req } = ctx
    const { url: urlParam } = req
    const url = decodeURIComponent(urlParam)
    const srcPath = path.join(basePath, url)
    const assetSrcPath = path.join(assetPath, url)

    try {
      await fs.access(assetSrcPath)
      ctx.body = await fs.readFile(assetSrcPath)
      ctx.type = mime.lookup(path.basename(assetSrcPath)) || 'text/plain'
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
      ctx.body = await renderContent(renderSrcPath, config, ctx)
    }
  }
}

module.exports = viewMiddleware
