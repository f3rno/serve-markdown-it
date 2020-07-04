/**
 * Render data for a single file.
 *
 * @typedef {Sermit~BaseRenderData} Sermit~FileRenderData
 * @property {number} size - size of file in bytes.
 * @property {string} sizeBytes - `size` formatted for human consumption.
 * @property {string} type - mime type, 'text/plain' if unidentified.
 * @property {string} [md] - markdown source. May have been pre-processed in the
 *   case of source files or images. @see {@link genImageMarkdown} and
 *   {@link genRawSrcMarkdown}
 * @property {string} [mdHTML] - markdown content rendered as HTML.
 * @property {object} [frontMatterData] - parsed content front matter data.
 */
