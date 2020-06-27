const path = require('path')
const fs = require('fs')
const _includes = require('lodash/includes')

const ICON_PATH = path.join(__dirname, '../../public/svg/icons/mime')
const ICONS = []

try {
  const iconNodes = fs.readdirSync(ICON_PATH, { withFileTypes: true })
  ICONS.push(...iconNodes.filter(n => n.isFile()).map(n => n.name))

// eslint-why control flow
/* eslint-disable-next-line no-empty */
} catch (e) {}

/**
 * @private
 */
const getFileIconName = (fn, isDirectory) => {
  const ext = fn[0] === '.'
    ? `.${fn.split('.')[1]}` // .eslintrc.json -> .eslintrc
    : path.extname(fn)

  const icon = isDirectory
    ? 'folder'
    : ext.slice(1).toLowerCase()

  const iconFN = `${icon}.svg`
  const extIconExists = _includes(ICONS, iconFN)

  return extIconExists
    ? iconFN
    : iconFN.endsWith('rc.svg')
      ? 'config.svg'
      : false
}

module.exports = getFileIconName
