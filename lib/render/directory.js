const path = require('path')
const _sum = require('lodash/sum')
const getRelativePath = require('../util/get_relative_path')
const getDirectoryData = require('./get_directory_data')

/**
 * @private
 */
const renderContentDirectory = async (srcPath, config) => {
  const { state, ...configData } = config
  const { md, template } = state
  const { renderPageDirectory } = template
  const nodes = await getDirectoryData(srcPath, config)
  const relPath = getRelativePath(srcPath)
  const totalSize = _sum(nodes.map(({ size }) => size))
  const inRoot = relPath === '/'

  const configJSON = JSON.stringify(configData, null, 2)
  const configMD = `\`\`\`json\n${configJSON}\n\`\`\``
  const configHTML = await md.render(configMD)

  return renderPageDirectory({
    parentPath: inRoot ? '' : path.join(relPath, '../'),
    flags: 'svw-directory',
    path: relPath,
    configHTML,
    totalSize,
    configMD,
    config,
    inRoot,
    nodes
  })
}

module.exports = renderContentDirectory
