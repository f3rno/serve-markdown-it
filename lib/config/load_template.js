const { requireDynamicModule } = require('serve-markdown-it-lib')

/**
 * @private
 */
const loadTemplate = async (config) => {
  const { template } = config
  const { name: templateName, config: templateConfig } = template
  const templateModule = await requireDynamicModule(templateName, config)
  const templateInstance = await templateModule(templateConfig)
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
