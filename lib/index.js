const getConfig = require('./config')
const createServer = require('./server')
const getLogger = require('./util/get_logger')
const getRelativePath = require('./util/get_relative_path')

module.exports = {
  getLogger,
  getConfig,
  createServer,
  getRelativePath
}
