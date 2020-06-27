const path = require('path')
const { promises: fs } = require('fs')
const PI = require('p-iteration')
const _isEmpty = require('lodash/isEmpty')

const EXT = 'wiki'
const EXT_REGEX = new RegExp(`\\.${EXT}$`, 'u')

/**
 * @private
 */
const getContentFiles = async (srcPath, subPath = '') => {
  const files = []

  try {
    await fs.access(path.join(srcPath, subPath))
  } catch (e) {
    throw new Error(`Path does not exist: ${srcPath}/${subPath}`)
  }

  const nodes = await fs.readdir(path.join(srcPath, subPath), {
    withFileTypes: true
  })

  await PI.forEach(nodes, async (node) => {
    if (node.isFile() && EXT_REGEX.test(node.name)) {
      files.push({
        name: node.name.replace(EXT_REGEX, ''),
        srcFN: path.join(srcPath, subPath, node.name),
        buildFN: path.join(subPath, `${node.name.replace(EXT_REGEX, '.html')}`)
      })
    } else if (node.isDirectory()) {
      const innerSubPath = path.join(subPath, node.name)
      const filesInNode = await getContentFiles(srcPath, innerSubPath)

      if (!_isEmpty(filesInNode)) {
        files.push(...filesInNode)
      }
    }
  })

  return files
}

module.exports = getContentFiles
