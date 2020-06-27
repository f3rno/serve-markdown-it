const path = require('path')
const _sum = require('lodash/sum')
const njk = require('../../nunjucks')
const getRelativePath = require('../../util/get_relative_path')
const getDirectoryData = require('./get_directory_data')

const LAYOUT = 'layouts/directory.njk'

/**
 * @private
 */
const renderContentDirectory = async (srcPath, config) => {
  const { state } = config
  const { md } = state
  const nodes = await getDirectoryData(srcPath, config)
  const relPath = getRelativePath(srcPath)
  const totalSize = _sum(nodes.map(({ size }) => size))
  const inRoot = relPath === '/'

  const { state: _, ...configData } = config
  const configJSON = JSON.stringify(configData, null, 2)
  const configHTML = await md.render(`\`\`\`json\n${configJSON}\n\`\`\``)

  return njk.render(LAYOUT, {
    parentPath: inRoot ? '' : path.join(relPath, '../'),
    flags: 'svw-directory',
    path: relPath,
    configHTML,
    totalSize,
    config,
    inRoot,
    nodes
  })
}

module.exports = renderContentDirectory
