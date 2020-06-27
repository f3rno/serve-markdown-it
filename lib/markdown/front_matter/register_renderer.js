const Bluebird = require('bluebird')
const _isUndefined = require('lodash/isUndefined')

/**
 * @private
 */
const registerRenderer = (md, renderData, name) => {
  const funcName = `${name}WithFrontMatter`

  if (!_isUndefined(md[funcName])) {
    throw new Error(
      `Custom front matter render method already exists: ${name}`
    )
  }

  /**
   * @private
   */
  md[funcName] = (src, env) => new Bluebird((resolve, reject) => {
    const html = md[name](src, env)

    if (renderData.error !== null) {
      reject(renderData.error)
      return
    }

    resolve({
      html,
      data: renderData.data || {}
    })

    renderData.data = null
    renderData.error = null
  })
}

module.exports = registerRenderer
