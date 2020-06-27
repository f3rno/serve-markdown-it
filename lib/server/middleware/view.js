const path = require('path')
const { promises: fs } = require('fs')
const serveAsset = require('../serve_asset')
const serveRaw = require('../serve_raw')
const serveMD = require('../serve_md')

/**
 * @private
 */
const viewMiddleware = async (params = {}) => {
  const { basePath, config } = params
  let info = {}

  try {
    info = await fs.stat(basePath)
  } catch (e) {
    throw new Error(`Path does not exist: ${basePath}`)
  }

  return async (ctx) => {
    const { req } = ctx
    const { url: urlParam } = req
    const url = decodeURIComponent(urlParam)
    const wasAsset = await serveAsset(ctx, url, config)

    if (wasAsset) {
      return
    }

    // Disable raw rendering when a single file is requested
    if (!info.isFile()) {
      const srcPath = path.join(basePath, url)
      const wasRaw = await serveRaw(ctx, srcPath)

      if (wasRaw) {
        return
      }
    }

    const srcPath = info.isFile()
      ? basePath
      : path.join(basePath, url.slice(1))

    await serveMD(srcPath, config, ctx)
  }
}

module.exports = viewMiddleware
