/**
 * @external cosmiconfig
 * @see https://github.com/davidtheclark/cosmiconfig
 */

/**
 * @external markdown-it-highlightjs
 * @see https://github.com/valeriangalliat/markdown-it-highlightjs
 */

/**
 * @external highlightjs
 * @see https://github.com/highlightjs/highlight.js
 */

/**
 * Plugin configuration data.
 *
 * @typedef {object} PluginConfig
 * @property {string} name - module name.
 * @property {string} [init='after'] - controls how the plugin is initialized,
 *   if 'after' the config is passed after it to `markdown-it`. If 'call' the
 *   module's default export is called with the config data, and the result
 *   passed to `markdown-it`.
 * @property {object} [config] - config data passed to the plugin on
 *   initialisation.
 */

/**
 * Plugin definition, either a raw module name or config object.
 *
 * @global
 *
 * @typedef {string|PluginConfig} PluginDefinition
 */

/**
 * Default {@link external:markdown-it} plugin configuration.
 *
 * @name DefaultMDPlugins
 * @type {object}
 * @constant
 * @readonly
 *
 * @property {object} 0 - {@link external:markdown-it-highlightjs} plugin, used
 *   to generate highlighted code blocks with {@link external:highlightjs}.
 * @property {string} ['0.name'='markdown-it-highlightjs'] - module name.
 * @property {string} ['0.init'='after'] - module init method.
 * @property {object} '0.config' - module config.
 * @property {boolean} ['0.config.auto'=true] - enables automatic language
 *   detection
 * @property {boolean} ['0.config.code'=true] - wraps inner markup in
 *   `<code>/<code>` tags.
 */

/**
 * Default configuration data; any loaded user configuration is applied on top
 * of the default values, using {@link external:cosmiconfig}.
 *
 * @see {@link DefaultMDPlugins}
 *
 * @name DefaultConfig
 * @type {object}
 * @constant
 * @readonly
 *
 * @property {boolean} [minify=true] - enables HTML minification for the server
 *   and when rendering, uses `html-minifier`.
 * @property {boolean} [excludeGitIgnore=true] - if true, any `.gitignore` file
 *   in the target path is loaded and used to filter directory listings.
 * @property {RegExp} [matchMarkdownFileNames=/\.(md|wiki|markdown)$/u] -
 *   regular expression used to detect files with Markdown-formatted content.
 * @property {object} template - template configuration.
 * @property {string} [template.name='serve-markdown-it-template-default'] -
 *   default template; @see {@link external:serve-markdown-it-template-default}
 * @property {object} template.config - configuration options passed to the
 *   template on initialisation
 * @property {object} markdownIt - {@link external:markdown-it} parser
 *   configuration options.
 * @property {boolean} [markdownIt.typographer=true] - enables conversion of
 *   quotes beautification (smartquotes).
 * @property {boolean} [markdownIt.linkify=true] - enables automatic conversion
 *   of text links to `<a>` tags.
 * @property {boolean} [markdownIt.html=true] - allows HTML tags in markdown
 *   source.
 * @property {PluginDefinition[]} [markdownIt.plugins=DefaultMDPLugins] - array
 *   of plugins for {@link external:markdown-it} to be loaded.
 */
const DEFAULT_CONFIG = {
  minify: true,
  excludeGitIgnore: true,
  matchMarkdownFileNames: /\.(md|wiki|markdown)$/u,

  template: {
    name: 'serve-markdown-it-template-default'
  },

  markdownIt: {
    typographer: true,
    linkify: true,
    html: true,
    plugins: [{
      name: 'markdown-it-highlightjs',
      init: 'after',
      config: {
        auto: true,
        code: true
      }
    }]
  }
}

module.exports = DEFAULT_CONFIG
