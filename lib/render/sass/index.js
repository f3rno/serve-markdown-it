const path = require('path')
const colors = require('colors')
const getLogger = require('../../util/get_logger')
const renderSASSStyle = require('./style')

const l = getLogger('render-sass')

/**
 * @private
 */
const renderSASS = async ({
  srcPath, buildPath, quiet, dry = true
}) => {
  const start = Date.now()
  const styleName = path.basename(buildPath)

  if (!dry) {
    await renderSASSStyle({ srcPath, buildPath })
  }

  if (!quiet) {
    l.info(
      'rendered style %s%s %s',
      colors.white(`${path.basename(srcPath)}/`),
      colors.green(styleName),
      dry
        ? colors.cyan('[dry]')
        : colors.blue(`in ${Date.now() - start}ms`)
    )
  }
}

module.exports = renderSASS
