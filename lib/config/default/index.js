/**
 * Default configuration data; any loaded user configuration is applied on top
 * of the default values, using {@link external:cosmiconfig}.
 *
 * @see {@link Sermit~DefaultMDPlugins}
 *
 * @name Sermit~DefaultConfig
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
 * @property {object} md - {@link external:markdown-it} parser
 *   configuration options.
 * @property {boolean} [md.typographer=true] - enables conversion of
 *   quotes beautification (smartquotes).
 * @property {boolean} [md.linkify=true] - enables automatic conversion
 *   of text links to `<a>` tags.
 * @property {boolean} [md.html=true] - allows HTML tags in markdown
 *   source.
 * @property {Sermit~MDPluginDefinition[]} [md.plugins=DefaultMDPLugins] -
 *   array of plugins for {@link external:markdown-it} to be loaded.
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
