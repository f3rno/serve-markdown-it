const _isEmpty = require('lodash/isEmpty')
const _isString = require('lodash/isString')
const _isObject = require('lodash/isObject')
const _includes = require('lodash/includes')
const PI = require('p-iteration')
const markdownIt = require('markdown-it')
const { requireModule } = require('serve-markdown-it-lib')
const registerFrontMatterExtension = require('./front_matter')

const USER_EXTENSION_BLACKLIST = [
  'markdown-it-front-matter'
]

/**
 * @private
 */
const getMD = async (config) => {
  const { md: mdConfig = {} } = config
  const { plugins = [], ...mdOptions } = mdConfig
  const md = markdownIt(mdOptions)

  registerFrontMatterExtension(md)

  const pluginData = plugins
    .map((plugin) => {
      if (_isObject(plugin)) {
        return plugin
      } else if (_isString(plugin)) {
        return { name: plugin }
      }

      throw new Error(`Unknown markdown-it plugin config: ${plugin}`)
    })
    .filter(({ name }) => !_includes(USER_EXTENSION_BLACKLIST, name))

  const pluginNames = await PI.map(pluginData, async (plugin) => {
    const { name, init = 'after', config: pluginConfig = {} } = plugin
    const pluginModule = await requireModule(name, config)

    if (init === 'after') {
      if (_isEmpty(pluginConfig)) {
        md.use(pluginModule)
      } else {
        md.use(pluginModule, pluginConfig)
      }
    } else if (init === 'call') {
      if (_isEmpty(pluginConfig)) {
        md.use(pluginModule())
      } else {
        md.use(pluginModule(pluginConfig))
      }
    } else {
      throw new Error(`Unknown markdown-it plugin init method: ${init}`)
    }

    return name
  })

  // eslint-why safe
  /* eslint-disable-next-line require-atomic-updates */
  md.pluginNames = pluginNames

  return md
}

module.exports = getMD
