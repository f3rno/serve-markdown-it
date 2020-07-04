const _isString = require('lodash/isString')
const _defaults = require('lodash/defaults')

/**
 * Converts the configured `markdown-it` plugin set to an array of config
 * objects, as literal strings are valid if no config is required.
 *
 * @private
 *
 * @param {Config} userConfig - user config.
 * @returns {Object} config - normalized config.
 */
const normalizeConfig = (userConfig = {}) => {
  const { md = {} } = userConfig
  const { plugins: configPlugins = [] } = md
  const plugins = configPlugins
    .map(plugin => (_isString(plugin) ? { name: plugin } : plugin))
    .map(plugin => _defaults(plugin, { init: 'after' }))

  return {
    ...userConfig,

    md: {
      ...md,
      plugins
    }
  }
}

module.exports = normalizeConfig
