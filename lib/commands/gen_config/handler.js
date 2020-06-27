const getConfig = require('../../config')

/**
 * @private
 */
const GEN_CONFIG_HANDLER = async (argv) => {
  const { minify, indent, path } = argv
  const config = await getConfig({ basePath: path })
  const { state, ...userConfig } = config
  const json = JSON.stringify(userConfig, null, minify ? 0 : indent)

  console.log(json)
}

module.exports = GEN_CONFIG_HANDLER
