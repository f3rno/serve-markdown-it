const { getRelativePath } = require('serve-markdown-it-lib')
const getMD = require('../markdown')
const DEFAULT_CONFIG = require('./default')

/**
 * Overrides the default configuration with a user config object. Deep options
 * are replaced, shallow ones merged (i.e. `markdown-it` constructor defaults).
 *
 * @param {Array} params - `[userConfig, userConfigPath, basePath]`
 * @returns {Promise} p - resolves with final config object.
 *
 * @see {@link getConfig}
 * @example <caption>usage within getConfig</caption>
 * const getConfig = ({ basePath, configPath, config: userConfig }) => (
 *   (userConfig
 *     ? Bluebird.resolve({ config: userConfig, filepath: configPath })
 *     : EXPLORER.search(basePath))
 *     .then(({ config, filepath }) => [config, filepath, basePath])
 *     .catch(() => [DEFAULT_CONFIG, null, basePath])
 *     .then(mergeConfig)
 *     .then(normalizeConfig)
 *     .then(validateConfig)
 *     .then(loadTemplate)
 * )
 */
const mergeConfig = async (params) => {
  const [userConfig, userConfigPath, basePath] = params
  const mdConfig = {
    ...DEFAULT_CONFIG.md,
    ...(userConfig.md || {}),

    plugins: (
      userConfig.md.plugins ||
      DEFAULT_CONFIG.md.plugins
    )
  }

  const state = { basePath }
  const configPath = userConfigPath && getRelativePath(basePath, { state })
  const md = await getMD({ state, md: mdConfig })

  return {
    ...DEFAULT_CONFIG,
    ...userConfig,

    md: mdConfig,
    template: userConfig.template || DEFAULT_CONFIG.template,
    state: { ...state, configPath, md }
  }
}

module.exports = mergeConfig
