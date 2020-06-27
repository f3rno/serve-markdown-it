const path = require('path')
const { promises: fs } = require('fs')
const _last = require('lodash/last')
const _isEmpty = require('lodash/isEmpty')
const ignore = require('ignore')

/**
 * @private
 */
const getGitIgnore = async (srcDir = process.cwd()) => {
  const srcPath = _last(srcDir.split('/')) === '.gitignore'
    ? srcDir
    : path.join(srcDir, '.gitignore')

  const ig = ignore()

  ig.add(['.git'])

  try {
    const gitignoreSrc = await fs.readFile(srcPath, 'utf-8')
    const entries = gitignoreSrc
      .split('\n')
      .map(ln => ln.trim())
      .filter(ln => !_isEmpty(ln))

    ig.add(entries)

  // eslint-why control flow
  /* eslint-disable-next-line no-empty */
  } catch (e) {}

  return ig
}

module.exports = getGitIgnore
