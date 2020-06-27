const path = require('path')
const _defaultsDeep = require('lodash/defaultsDeep')

/**
 * @private
 */
const loadTemplate = (config) => {
  const { template } = config
  const { name, config: templateConfig } = template
  const templateModulePath = path.join(process.cwd(), 'node_modules', name)

  // eslint-why dynamic require.
  /* eslint-disable unicorn/no-abusive-eslint-disable */
  // eslint-why config load.
  /* eslint-disable-next-line */
  const templateModule = require(templateModulePath)
  const { DEFAULT_CONFIG = {} } = templateModule
  const finalTemplateConfig = _defaultsDeep(templateConfig, DEFAULT_CONFIG)

  return {
    ...config,

    template: {
      ...config.template,
      config: finalTemplateConfig
    },

    state: {
      ...(config.state || {}),
      template: templateModule(finalTemplateConfig)
    }
  }
}

module.exports = loadTemplate
