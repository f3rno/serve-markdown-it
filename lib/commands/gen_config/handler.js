const getConfig = require('../../config')
const DEFAULT_PLUGINS = require('../../config/default/plugins')

/**
 * @private
 */
const GEN_CONFIG_HANDLER = async (argv) => {
  const { minify, indent } = argv
  const config = await getConfig({
    config: {
      markdownIt: {
        plugins: DEFAULT_PLUGINS
      }
    }
  })

  const { state, ...userConfig } = config
  const json = JSON.stringify(userConfig, null, minify ? 0 : indent)

  console.log(json)
}

module.exports = GEN_CONFIG_HANDLER
