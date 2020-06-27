const renderSASS = require('./render/sass')
const renderAssets = require('./render/assets')
const createServer = require('./server')
const getConfig = require('./config')
const getLogger = require('./util/get_logger')
const getRelativePath = require('./util/get_relative_path')

module.exports = {
  createServer,
  getLogger,
  renderSASS,
  renderAssets,
  getConfig,
  getRelativePath
}
