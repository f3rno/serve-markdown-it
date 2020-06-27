/**
 * @private
 */
const serveAsset = async (ctx, url, config) => {
  const { state } = config
  const { template } = state
  const { readAsset } = template

  try {
    const { type, src } = await readAsset(url)

    ctx.body = src
    ctx.type = type
    ctx.renderType = 'asset'

    return true
  } catch (e) {
    return false
  }
}

module.exports = serveAsset
