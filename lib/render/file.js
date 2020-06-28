const path = require('path')
const { promises: fs } = require('fs')
const mime = require('mime-types')
const { getRelativePath } = require('serve-markdown-it-lib')
const renderContentMarkdown = require('./markdown')

/**
 * @private
 */
const renderContentFile = async (srcPath, config) => {
  const { matchMarkdownFileNames, state } = config
  const { template } = state
  const { genImageMarkdown, genRawSrcMarkdown } = template
  const relPath = getRelativePath(srcPath, config)
  const name = path.basename(srcPath)

  let flags = null
  let mdSrc = ''

  if (matchMarkdownFileNames && matchMarkdownFileNames.test(name)) {
    mdSrc = await fs.readFile(srcPath, 'utf-8')
  } else {
    const type = mime.lookup(name)
    const genData = { srcPath, relPath, name }

    if (/image/u.test(type)) {
      mdSrc = genImageMarkdown(genData)
    } else {
      const { flags: rawFlags, md } = await genRawSrcMarkdown(genData)

      flags = rawFlags
      mdSrc = md
    }
  }

  return renderContentMarkdown(name, mdSrc, srcPath, flags, config)
}

module.exports = renderContentFile
