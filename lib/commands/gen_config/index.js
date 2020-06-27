const cmdHandler = require('../../util/cmd_handler')
const yargsConfig = require('./yargs_config')
const handler = require('./handler')

/**
 * @private
 */
const GEN_CONFIG_COMMAND = {
  ...yargsConfig,
  handler: cmdHandler(handler)
}

module.exports = GEN_CONFIG_COMMAND
