const path = require('path')
const _sum = require('lodash/sum')
const byteman = require('byteman')
const { getRelativePath } = require('serve-markdown-it-lib')
const getDirectoryData = require('./get_directory_data')

/**
 * @private
 */
const renderContentDirectory = async (srcPath, config) => {
  const { state, ...configData } = config
  const { md, template } = state
  const { renderPageDirectory } = template
  const nodes = await getDirectoryData(srcPath, config)
  const relPath = getRelativePath(srcPath, config)
  const totalSizeBytes = _sum(nodes.map(({ sizeBytes }) => sizeBytes))
  const totalSize = byteman(totalSizeBytes, 2, true)
  const inRoot = relPath === '/'

  const configJSON = JSON.stringify(configData, null, 2)
  const configMD = `\`\`\`json\n${configJSON}\n\`\`\``
  const configHTML = await md.render(configMD)

  return renderPageDirectory({
    parentPath: inRoot ? '' : path.join(relPath, '../'),
    flags: 'svw-directory',
    path: relPath,
    totalSizeBytes,
    totalSize,
    configHTML,
    configMD,
    config,
    inRoot,
    nodes
  })
}

module.exports = renderContentDirectory
