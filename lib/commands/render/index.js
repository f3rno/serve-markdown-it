const cmdHandler = require('../../util/cmd_handler')
const yargsConfig = require('./yargs_config')
const handler = require('./handler')

/**
 * @private
 */
const RENDER_COMMAND = {
  ...yargsConfig,
  handler: cmdHandler(handler)
}

module.exports = RENDER_COMMAND
