const path = require('path')
const { renderAssets, getLogger } = require('../lib')

const l = getLogger('build-style')

const USED_MATERIAL_ICONS = ['navigate-before']

const BUILD_PATH = 'public/'
const SRC_PATH = 'res/assets'
const ASSETS = {
  fonts: 'fonts',
  'css/highlightjs': '~highlight.js/styles',
  'svg/icons/mime': '~file-icon-vectors/dist/icons/vivid',
  'js/simple-datatables': '~simple-datatables/dist/umd',
  'js/zepto': '~zepto/dist'
}

USED_MATERIAL_ICONS.forEach((icon) => {
  ASSETS[`svg/icons/material/${icon}.svg`] = (
    `~svg-icon/dist/svg/material/${icon}.svg`
  )
})

renderAssets({
  assets: ASSETS,
  srcPath: path.join(__dirname, '../', SRC_PATH),
  buildPath: path.join(__dirname, '../', BUILD_PATH),
  quiet: false,
  dry: false
}).then(() => {
  l.success('built assets %s -> %s', SRC_PATH, BUILD_PATH)
}).catch((e) => {
  l.error('%s', e.stack)
})
