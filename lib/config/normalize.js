const _isString = require('lodash/isString')
const _defaults = require('lodash/defaults')

/**
 * @private
 */
const normalizeConfig = (config = {}) => {
  const { markdownIt = {} } = config
  const { plugins: configPlugins = [] } = markdownIt
  const plugins = configPlugins
    .map(plugin => (_isString(plugin) ? { name: plugin } : plugin))
    .map(plugin => _defaults(plugin, { init: 'after' }))

  return {
    ...config,

    markdownIt: {
      ...markdownIt,
      plugins
    }
  }
}

module.exports = normalizeConfig
