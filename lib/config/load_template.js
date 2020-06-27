const requireConfigModule = require('../util/require_config_module')

/**
 * @private
 */
const loadTemplate = (config) => {
  const { template } = config
  const { name: templateName, config: templateConfig } = template
  const templateModule = requireConfigModule(templateName)
  const templateInstance = templateModule(templateConfig)
  const { config: finalTemplateConfig } = templateInstance

  return {
    ...config,

    template: {
      name: templateName,
      config: finalTemplateConfig
    },

    state: {
      ...(config.state || {}),
      template: templateInstance
    }
  }
}

module.exports = loadTemplate
