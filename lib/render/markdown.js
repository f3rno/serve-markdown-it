const path = require('path')
const { promises: fs } = require('fs')
const mime = require('mime-types')
const getRelativePath = require('../util/get_relative_path')

/**
 * @private
 */
const renderContentMarkdown = async (title, src, srcPath, flags, config) => {
  const { state } = config
  const { md, template } = state
  const { renderPageMarkdown } = template
  const relPath = getRelativePath(srcPath, config)
  const info = await fs.stat(srcPath)
  const inRoot = relPath === '/'
  const { size } = info

  const { html, data } = await md.renderWithFrontMatter(src)
  const { state: _, ...configData } = config
  const configJSON = JSON.stringify(configData, null, 2)
  const configMD = `\`\`\`json\n${configJSON}\n\`\`\``
  const configHTML = await md.render(configMD)

  return renderPageMarkdown({
    parentPath: inRoot ? '' : path.join(relPath, '../'),
    type: mime.lookup(path.basename(srcPath)),
    title: data.title || title,
    path: relPath,
    configHTML,
    configMD,
    config,
    inRoot,
    flags,
    size,
    html,
    data,
    src
  })
}

module.exports = renderContentMarkdown
