/**
 * Default configuration data.
 *
 * @type {object}
 * @constant
 * @readonly
 */
const DEFAULT_CONFIG = {
  minify: true,
  excludeGitIgnore: true,
  matchMarkdownFileNames: /\.(md|wiki|markdown)$/u,

  theme: {
    name: 'sermit-theme-default',
    config: {
      contentHeader: true
    }
  },

  markdownIt: {
    typographer: true,
    linkify: true,
    html: true
  }
}

module.exports = DEFAULT_CONFIG
