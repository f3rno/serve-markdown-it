const path = require('path')
const { promises: fs } = require('fs')
const mime = require('mime-types')
const njk = require('../../nunjucks')
const getRelativePath = require('../../util/get_relative_path')

const LAYOUT = 'layouts/file_md.njk'

/**
 * @private
 */
const renderContentMarkdown = async (title, src, srcPath, flags, config) => {
  const { state } = config
  const { md } = state
  const relPath = getRelativePath(srcPath)
  const info = await fs.stat(srcPath)
  const inRoot = relPath === '/'
  const { size } = info

  const { html, data } = await md.renderWithFrontMatter(src)
  const { state: _, ...configData } = config
  const configJSON = JSON.stringify(configData, null, 2)
  const configHTML = await md.render(`\`\`\`json\n${configJSON}\n\`\`\``)

  return njk.render(LAYOUT, {
    parentPath: inRoot ? '' : path.join(relPath, '../'),
    type: mime.lookup(path.basename(srcPath)),
    title: data.title || title,
    path: relPath,
    configHTML,
    config,
    inRoot,
    flags,
    size,
    html,
    data
  })
}

module.exports = renderContentMarkdown
