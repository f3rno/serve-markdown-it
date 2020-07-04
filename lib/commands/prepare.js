const { promises: fs } = require('fs')
const path = require('path')
const _isEmpty = require('lodash/isEmpty')
const DEFAULT_CONFIG = require('./default')

/**
 * Merges the provided user config with the default configuration.
 *
 * @param {Array} [data=[]] - data, with [config, path].
 * @returns {Promise} p - resolves to final merged config.
 *
 * @example
 * // TODO
 */
const prepareConfig = async (data = []) => {
  const [userConfig = {}, basePath] = data

  if (_isEmpty(userConfig)) {
    return DEFAULT_CONFIG
  }

  const state = { basePath }
  const info = await fs.stat(basePath, { withFileTypes: true })
  const baseDir = info.isDirectory()
    ? basePath
    : path.dirname(basePath)

  return {
    ...DEFAULT_CONFIG,
    ...userConfig
  }

  // return _defaultsDeep(config, DEFAULT_CONFIG, {
  //   state: _merge({
  //     baseDir,
  //     configPath: filepath && getRelativePath(filepath, { state })
  //   }, state)
  // })
}

module.exports = prepareConfig
