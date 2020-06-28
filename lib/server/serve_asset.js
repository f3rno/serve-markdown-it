const { readAsset } = require('serve-markdown-it-lib')

/**
 * @private
 */
const serveAsset = async (ctx, url, config) => {
  try {
    const { type, src } = await readAsset(config, url)

    ctx.body = src
    ctx.type = type
    ctx.renderType = 'asset'

    return true
  } catch (e) {
    return false
  }
}

module.exports = serveAsset
