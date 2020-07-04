/**
 * `markdown-it` plugin configuration data.
 *
 * @typedef {object} Sermit~MDPluginConfig
 * @property {string} name - module name.
 * @property {string} [init='after'] - controls how the plugin is initialized,
 *   if 'after' the config is passed after it to `markdown-it`. If 'call' the
 *   module's default export is called with the config data, and the result
 *   passed to `markdown-it`.
 * @property {object} [config] - config data passed to the plugin on
 *   initialisation.
 */
