const DEFAULT_PLUGINS = [{
  name: 'markdown-it-anchor',
  init: 'after',
  config: {
    permalink: true,
    permalinkBefore: true,
    permalinkSymbol: '§'
  }
}, {
  name: 'markdown-it-highlightjs',
  init: 'after',
  config: {
    auto: true,
    code: true
  }
}]

module.exports = DEFAULT_PLUGINS
