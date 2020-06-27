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

  template: {
    name: 'serve-markdown-it-template-default'
  },

  markdownIt: {
    typographer: true,
    linkify: true,
    html: true
  }
}

module.exports = DEFAULT_CONFIG
