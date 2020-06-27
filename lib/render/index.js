const { promises: fs } = require('fs')
const _isEmpty = require('lodash/isEmpty')
const { minify: minifyHTML } = require('html-minifier')
const renderContentFile = require('./file')
const renderContentDirectory = require('./directory')

/**
 * @private
 */
const renderContent = async (srcPath, config, ctx) => {
  const { minify } = config
  const info = await fs.stat(srcPath)
  const html = info.isFile()
    ? await renderContentFile(srcPath, config)
    : await renderContentDirectory(srcPath, config)

  if (_isEmpty(html)) {
    ctx.throw(400)
  }

  ctx.renderType = info.isFile() ? 'file' : 'directory'

  return minify
    ? minifyHTML(html, {
      collapseWhitespace: true,
      removeComments: true,
      removeTagWhitespace: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      sortClassName: true,
      sortAttributes: true,
      minifyCSS: true,
      minifyJS: true
    })
    : html
}

module.exports = renderContent
