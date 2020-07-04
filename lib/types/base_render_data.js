/**
 * Render data shared by all types of content.
 *
 * @typedef {object} Sermit~BaseRenderData
 * @property {string} path - page URL, and path from content root.
 * @property {string} parentPath - URL to parent directory; empty string if
 *   `inRoot` to allow direct rendering as `href` attribute.
 * @property {Sermit~RenderType} renderType - @see {@link Sermit~RenderType}
 * @property {SermitConfig} config - active `sermit` configuration data
 *   without `state`.
 * @property {boolean} inRoot - if true, `path` is the content root.
 */
