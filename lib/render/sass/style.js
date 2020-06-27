const path = require('path')
const { promises: fs } = require('fs')
const sass = require('sass')

const INCLUDE_PATH_MODULES = path.join(__dirname, '../../../node_modules')
const INCLUDE_PATH_STYLES = path.join(__dirname, '../../../res/styles')

/**
 * @private
 */
const renderSASSStyle = async ({ srcPath, buildPath }) => {
  const res = sass.renderSync({
    file: srcPath,
    outFile: buildPath,
    compressed: true,
    includePaths: [
      INCLUDE_PATH_MODULES,
      INCLUDE_PATH_STYLES
    ]
  })

  await fs.writeFile(buildPath, res.css.toString())
}

module.exports = renderSASSStyle
