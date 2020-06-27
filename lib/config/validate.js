const _isObject = require('lodash/isObject')

/**
 * @todo full validation
 * @private
 */
const validateConfig = (config) => {
  if (!_isObject(config)) {
    throw new Error(`Config must be an object (got ${typeof config})`)
  }

  return config
}

module.exports = validateConfig
