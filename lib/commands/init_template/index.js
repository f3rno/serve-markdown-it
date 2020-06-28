const cmdHandler = require('../../util/cmd_handler')
const yargsConfig = require('./yargs_config')
const handler = require('./handler')

/**
 * @private
 */
const INIT_TEMPLATE_COMMAND = {
  ...yargsConfig,
  handler: cmdHandler(handler)
}

module.exports = INIT_TEMPLATE_COMMAND
