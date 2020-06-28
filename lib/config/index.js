const Bluebird = require('bluebird')
const _merge = require('lodash/merge')
const { cosmiconfig } = require('cosmiconfig')
const { getRelativePath } = require('serve-markdown-it-lib')
const getMD = require('../markdown')
const validateConfig = require('./validate')
const normalizeConfig = require('./normalize')
const loadTemplate = require('./load_template')

const DEFAULT_CONFIG = require('./default')

const APP_NAME = 'sermit'
const EXPLORER = cosmiconfig(APP_NAME)

/**
 * Configuration data.
 *
 * @typedef {object} Config
 *
 * @property {boolean} [minify] - enables HTML minification for the server and
 *   when rendering, uses `html-minifier`.
 * @property {boolean} [excludeGitIgnore] - if true, any `.gitignore` file in
 *   the target path is loaded and used to filter directory listings.
 * @property {RegExp} [matchMarkdownFileNames] - regular expression used to
 *   detect files with Markdown-formatted content.
 * @property {object} [template] - template configuration.
 * @property {string} [template.name] - template module name.
 * @property {object} [template.config] - configuration options passed to the
 *   template on initialisation.
 * @property {object} [markdownIt] - {@link external:markdown-it} parser
 *   configuration options. All keys besides `plugins` are passed to
 *   the {@link external:markdown-it} constructor.
 * @property {PluginDefinition[]} [markdownIt.plugins] - array of plugins for
 *   {@link external:markdown-it} to be loaded.
 */

/**
 * Resolve the runtime configuration, loading the first user config file found.
 * Searches directories up the path for any of the following files:
 *
 * - `.sermitrc`
 * - `.sermitrc.js`
 * - `.sermitrc.json`
 * - `.sermitrc.yaml`
 * - `.sermitrc.yml`
 *
 * Any discovered user config file is merged with the default
 * {@link DefaultConfig} object.
 *
 * @param {object} params - params.
 * @param {string} [params.basePath=cwd] - path to start searching in.
 * @param {string} [params.configPath] - path to pre-loaded user config file,
 *   required if `config` is provided.
 * @param {object} [params.config] - user config file if already found, search
 *   is skipped if provided.
 * @returns {Promise} p - resolves with the final {@link Config} object.
 *
 * @example
 * const config = await getConfig({ basePath: basePath })
 * const { state } = config
 * const { md, configPath, template } = state
 *
 * if (configPath) {
 *   l.star('read config from %s', colors.bgGreen.black(configPath))
 * }
 *
 * if (_isEmpty(command) || command === 'serve' || command === 'render') {
 *   l.star('using template %s', colors.cyan(template.name))
 *
 *   md.pluginNames.forEach((name) => {
 *     l.star('using md plugin %s', colors.yellow(name))
 *   })
 * }
 */
const getConfig = ({
  basePath,
  configPath,
  config: userConfig
}) => (
  (userConfig
    ? Bluebird.resolve({ config: userConfig, filepath: configPath })
    : EXPLORER.search(basePath))
    .then(({ config, filepath }) => [config, filepath])
    .catch(() => [{}, null])
    .then(([config, filepath]) => {
      const mergedConfig = _merge({
        state: { basePath }
      }, DEFAULT_CONFIG, config)

      return {
        ...mergedConfig,

        state: {
          ...mergedConfig.state,

          configPath: filepath && getRelativePath(filepath, mergedConfig)
        }
      }
    })
    .then(({ markdownIt = {}, ...config }) => ({
      ...config,
      markdownIt: {
        ...markdownIt,
        plugins: markdownIt.plugins || DEFAULT_CONFIG.markdownIt.plugins
      }
    }))
    .then(validateConfig)
    .then(loadTemplate)
    .then(normalizeConfig)
    .then(async (config) => {
      const md = await getMD(config)

      return {
        ...config,
        state: { ...config.state, md }
      }
    })
)

module.exports = getConfig
