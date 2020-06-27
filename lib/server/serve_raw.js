const path = require('path')
const { promises: fs } = require('fs')
const mime = require('mime-types')

/**
 * @private
 */
const serveRaw = async (ctx, srcPath) => {
  const raw = /\/raw$/u.test(srcPath)

  if (!raw) {
    return false
  }

  const renderSrcPath = raw ? path.dirname(srcPath) : srcPath

  await fs.access(renderSrcPath)

  ctx.body = await fs.readFile(renderSrcPath)
  ctx.type = mime.lookup(path.basename(renderSrcPath)) || 'text/plain'
  ctx.renderType = 'raw'

  return true
}

module.exports = serveRaw
