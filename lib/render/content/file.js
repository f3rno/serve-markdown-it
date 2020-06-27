const path = require('path')
const { promises: fs } = require('fs')
const mime = require('mime-types')
const getRelativePath = require('../../util/get_relative_path')
const renderContentMarkdown = require('./markdown')

/**
 * @private
 */
const renderContentFile = async (srcPath, config) => {
  const { matchMarkdownFileNames } = config
  const name = path.basename(srcPath)
  const ext = path.extname(srcPath)
  let flags = null
  let mdSrc = ''

  if (matchMarkdownFileNames && matchMarkdownFileNames.test(name)) {
    mdSrc = await fs.readFile(srcPath, 'utf-8')
  } else {
    const type = mime.lookup(name)

    if (/image/u.test(type)) {
      const relPath = getRelativePath(srcPath)
      const imgPath = relPath
        .split(path.sep)
        .map(encodeURIComponent)
        .join(path.sep)

      mdSrc = `![${name}](${imgPath}/raw)`
    } else {
      const src = await fs.readFile(srcPath, 'utf-8')

      flags = 'single-code-fence'
      mdSrc = [
        `\`\`\`${ext.slice(1)}`,
        src.trim(),
        '```'
      ].join('\n')
    }
  }

  return renderContentMarkdown(name, mdSrc, srcPath, flags, config)
}

module.exports = renderContentFile
