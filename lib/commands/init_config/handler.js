const getConfig = require('../../config')

/**
 * @private
 */
const INIT_CONFIG_HANDLER = async (argv) => {
  const { minify, indent, path } = argv
  const config = await getConfig({ basePath: path })
  const { state, ...userConfig } = config
  const json = JSON.stringify(userConfig, null, minify ? 0 : indent)

  console.log(json)
}

module.exports = INIT_CONFIG_HANDLER
