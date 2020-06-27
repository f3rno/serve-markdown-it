const path = require('path')
const { renderSASS, getLogger } = require('../lib')

const l = getLogger('build-style')

const BUILD_PATH = 'public/index.css'
const SRC_PATH = 'res/styles/index.scss'

renderSASS({
  srcPath: path.join(__dirname, '../', SRC_PATH),
  buildPath: path.join(__dirname, '../', BUILD_PATH),
  quiet: false,
  dry: false
}).then(() => {
  l.success('built %s -> %s', SRC_PATH, BUILD_PATH)
}).catch((e) => {
  l.error('%s', e.stack)
})
