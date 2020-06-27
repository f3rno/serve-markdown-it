const path = require('path')
const { promises: fs } = require('fs')
const _template = require('lodash/template')
const jsDoc2MD = require('jsdoc-to-markdown')
const { getLogger } = require('../')

/**
 * @private
 */
const getPath = p => path.join(__dirname, '../', p)

const TEMPLATE_SRC = '.template.README.md'
const TEMPLATE_DST = 'README.md'
const API_SRC = ['*.js', 'lib/**'].map(getPath)
const USAGE_SRC = ['index.js'].map(getPath)

const l = getLogger('gen-readme')

jsDoc2MD.render({ files: API_SRC }).then(async (api) => {
  const usage = await jsDoc2MD.render({ files: USAGE_SRC })
  const templatePath = getPath(TEMPLATE_SRC)
  const templateSrc = await fs.readFile(templatePath, 'utf-8')
  const template = _template(templateSrc)
  const readme = template({ usage, api })
  const dst = getPath(TEMPLATE_DST)

  await fs.writeFile(dst, readme)

  l.success('rendered %s', dst)
}).catch((e) => {
  l.error('%s', e.stack)
})
