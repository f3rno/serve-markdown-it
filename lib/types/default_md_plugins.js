/**
 * Default {@link external:markdown-it} plugin configuration.
 *
 * @name Sermit~DefaultMDPlugins
 * @type {object}
 * @constant
 * @readonly
 *
 * @property {object} 0 - {@link external:markdown-it-highlightjs} plugin, used
 *   to generate highlighted code blocks with {@link external:highlightjs}.
 * @property {string} ['0.name'='markdown-it-highlightjs'] - module name.
 * @property {string} ['0.init'='after'] - module init method.
 * @property {object} '0.config' - module config.
 * @property {boolean} ['0.config.auto'=true] - enables automatic language
 *   detection
 * @property {boolean} ['0.config.code'=true] - wraps inner markup in
 *   `<code>/<code>` tags.
 */
