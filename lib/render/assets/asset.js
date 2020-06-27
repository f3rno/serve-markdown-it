const fsSync = require('fs')
const path = require('path')
const fsExtra = require('fs-extra')
const browserify = require('browserify')
const _isEmpty = require('lodash/isEmpty')

const { promises: fs } = fsSync

/**
 * @private
 */
const renderAsset = async ({ srcPath, buildPath, options }) => {
  const buildDir = path.dirname(buildPath)

  try {
    await fs.access(buildDir)
  } catch (e) {
    await fs.mkdir(buildDir, { recursive: true })
  }

  if (_isEmpty(options)) {
    await fsExtra.copy(srcPath, buildPath, { overwrite: true })
  } else {
    const destStream = fsSync.createWriteStream(buildPath)
    const b = browserify(srcPath, options)

    b.bundle().pipe(destStream)

    destStream.close()
  }
}

module.exports = renderAsset
