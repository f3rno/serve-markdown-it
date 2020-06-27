const path = require('path')
const _isEmpty = require('lodash/isEmpty')
const _isString = require('lodash/isString')
const _isObject = require('lodash/isObject')
const _includes = require('lodash/includes')
const markdownIt = require('markdown-it')
const registerFrontMatterExtension = require('./front_matter')

const USER_EXTENSION_BLACKLIST = [
  'markdown-it-front-matter'
]

/**
 * @private
 */
const getMD = (config) => {
  const { markdownIt: markdownItConfig = {} } = config
  const { plugins = [], ...markdownItOptions } = markdownItConfig
  const md = markdownIt(markdownItOptions)

  registerFrontMatterExtension(md)

  md.pluginNames = plugins
    .map((plugin) => {
      if (_isObject(plugin)) {
        return plugin
      } else if (_isString(plugin)) {
        return { name: plugin }
      }

      throw new Error(`Unknown markdown-it plugin config: ${plugin}`)
    })
    .filter(({ name }) => !_includes(USER_EXTENSION_BLACKLIST, name))
    .map((plugin) => {
      const { name, init = 'after', config: pluginConfig = {} } = plugin
      const pluginModulePath = path.join(process.cwd(), 'node_modules', name)

      // eslint-why dynamic require.
      /* eslint-disable unicorn/no-abusive-eslint-disable */
      // eslint-why config load.
      /* eslint-disable-next-line */
      const pluginModule = require(pluginModulePath)

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

  return md
}

module.exports = getMD
