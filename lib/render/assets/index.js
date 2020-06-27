const path = require('path')
const colors = require('colors')
const PI = require('p-iteration')
const _keys = require('lodash/keys')
const _isEmpty = require('lodash/isEmpty')
const _isObject = require('lodash/isObject')
const getLogger = require('../../util/get_logger')
const renderAsset = require('./asset')

const l = getLogger('render-assets')

/**
 * @private
 */
const renderAssets = async ({
  assets, srcPath, buildPath, quiet, dry = true
}) => {
  const start = Date.now()
  const assetBuildPaths = _keys(assets)

  if (_isEmpty(assetBuildPaths)) {
    l.star('no assets to render')
    return
  }

  await PI.forEach(assetBuildPaths, async (destPath) => {
    const startFile = Date.now()
    const { [destPath]: assetDef } = assets
    const assetPath = _isObject(assetDef) ? assetDef.path : assetDef
    const assetOptions = _isObject(assetDef) ? assetDef : {}
    const assetSrcPath = assetPath.startsWith('~')
      ? path.join(
        __dirname,
        '../../../',
        assetPath.replace(/^~/u, 'node_modules/')
      )
      : path.join(srcPath, assetPath)

    if (!dry) {
      await renderAsset({
        srcPath: assetSrcPath,
        options: assetOptions,
        buildPath: path.join(buildPath, destPath)
      })
    }

    if (!quiet) {
      l.info(
        'rendered asset %s%s %s',
        colors.white(`${path.basename(srcPath)}/`),
        colors.green(assetPath),
        dry
          ? colors.cyan('[dry]')
          : colors.blue(`in ${Date.now() - startFile}ms`)
      )
    }
  })

  l.success(
    'rendered %d assets %s',
    assetBuildPaths.length,
    colors.blue(`(in ${Date.now() - start}ms)`)
  )
}

module.exports = renderAssets
