const path = require('path')

/**
 * Converts the provided absolute path to a path relative to the configured
 * content root, with a `/` prefix for linking in rendered HTML.
 *
 * @param {string} absPath - absolute path
 * @param {Config} config - config
 * @returns {string} relPath
 *
 * @example
 * const { state } = config
 * const { template } = state
 * const { genRawSrcMarkdown } = template
 * const relPath = getRelativePath('/home/user/markdown-it/README.md', config)
 *
 * await genRawSrcMarkdown({ relPath, ...genData })
 *
 */
const getRelativePath = (absPath, config) => {
  const { state } = config
  const { basePath } = state

  return `${path.sep}${path.relative(basePath, absPath)}`
}

module.exports = getRelativePath
