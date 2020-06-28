const path = require('path')
const { promises: fs } = require('fs')
const byteman = require('byteman')
const mime = require('mime-types')
const { getRelativePath } = require('serve-markdown-it-lib')

/**
 * @private
 */
const renderContentMarkdown = async (title, src, srcPath, flags, config) => {
  const { state } = config
  const { md, template } = state
  const { renderPageFile } = template
  const relPath = getRelativePath(srcPath, config)
  const info = await fs.stat(srcPath)
  const inRoot = relPath === '/'
  const { size: sizeBytes } = info
  const size = byteman(sizeBytes, 2, true)

  const { html, data } = await md.renderWithFrontMatter(src)
  const { state: _, ...configData } = config

  return renderPageFile({
    parentPath: inRoot ? '' : path.join(relPath, '../'),
    type: mime.lookup(path.basename(srcPath)) || 'text/plain',
    title: data.title || title,
    frontMatterData: data,
    config: configData,
    path: relPath,
    mdHTML: html,
    md: src,

    sizeBytes,
    inRoot,
    flags,
    size
  })
}

module.exports = renderContentMarkdown
