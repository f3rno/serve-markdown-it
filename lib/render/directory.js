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
  const { template } = state
  const { renderPageDirectory } = template
  const nodes = await getDirectoryData(srcPath, config)
  const relPath = getRelativePath(srcPath, config)
  const totalSizeBytes = _sum(nodes.map(({ sizeBytes }) => sizeBytes))
  const totalSize = byteman(totalSizeBytes, 2, true)
  const inRoot = relPath === '/'

  return renderPageDirectory({
    parentPath: inRoot ? '' : path.join(relPath, '../'),
    flags: 'svw-directory',
    config: configData,
    path: relPath,
    totalSizeBytes,
    totalSize,
    inRoot,
    nodes
  })
}

module.exports = renderContentDirectory
