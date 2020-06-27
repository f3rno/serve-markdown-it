const Bluebird = require('bluebird')
const _merge = require('lodash/merge')
const { cosmiconfig } = require('cosmiconfig')
const getMD = require('../markdown')
const getRelativePath = require('../util/get_relative_path')
const validateConfig = require('./validate')
const normalizeConfig = require('./normalize')
const loadTemplate = require('./load_template')

const DEFAULT_CONFIG = require('./default')
const DEFAULT_PLUGINS = require('./default/plugins')

const APP_NAME = 'sermit'
const EXPLORER = cosmiconfig(APP_NAME)

/**
 * @private
 *
 * @returns {Promise} p
 */
const getConfig = ({
  startPath,
  configPath,
  config: userConfig
}) => (
  (userConfig
    ? Bluebird.resolve({ config: userConfig, filepath: configPath })
    : EXPLORER.search(startPath))
    .then(({ config, filepath }) => [config, filepath])
    .catch(() => [{ plugins: DEFAULT_PLUGINS }, null])
    .then(([config, filepath]) => _merge({}, DEFAULT_CONFIG, config, {
      state: {
        configPath: filepath && getRelativePath(filepath)
      }
    }))
    .then(validateConfig)
    .then(loadTemplate)
    .then(normalizeConfig)
    .then(config => ({
      ...config,

      state: {
        ...config.state,

        md: getMD(config)
      }
    }))
)

module.exports = getConfig
