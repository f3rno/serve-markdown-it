const JSYAML = require('js-yaml')
const signale = require('signale')
const MarkdownItFrontMatter = require('markdown-it-front-matter')
const registerRenderer = require('./register_renderer')

/**
 * @private
 */
const frontMatter = (md) => {
  const renderData = {
    data: null,
    error: null
  }

  // This cb is called prior to render completion
  md.use(MarkdownItFrontMatter, (yamlSrc) => {
    try {
      renderData.data = JSYAML.safeLoad(yamlSrc)
      renderData.error = null
    } catch (e) {
      signale.error(`Failed to parse YAML front matter: ${yamlSrc}`)

      renderData.data = null
      renderData.error = e
    }
  })

  registerRenderer(md, renderData, 'render')
  registerRenderer(md, renderData, 'renderInline')
}

module.exports = frontMatter
