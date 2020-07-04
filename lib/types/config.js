/**
 * Configuration data.
 *
 * @typedef {object} Sermit~Config
 *
 * @property {boolean} [minify] - enables HTML minification for the server and
 *   when rendering, uses `html-minifier`.
 * @property {boolean} [excludeGitIgnore] - if true, any `.gitignore` file in
 *   the target path is loaded and used to filter directory listings.
 * @property {RegExp} [matchMarkdownFileNames] - regular expression used to
 *   detect files with Markdown-formatted content.
 * @property {object} [template] - template configuration.
 * @property {string} [template.name] - template module name.
 * @property {object} [template.config] - configuration options passed to the
 *   template on initialisation.
 * @property {object} [md] - {@link external:markdown-it} parser
 *   configuration options. All keys besides `plugins` are passed to
 *   the {@link external:markdown-it} constructor.
 * @property {PluginDefinition[]} [md.plugins] - array of plugins for
 *   {@link external:markdown-it} to be loaded.
 */
