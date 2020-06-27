const path = require('path')

/**
 * @private
 */
const getRelativePath = pathStr => (
  `${path.sep}${path.relative(process.cwd(), pathStr)}`
)

module.exports = getRelativePath
