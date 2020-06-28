const colors = require('colors')
const { getLogger } = require('serve-markdown-it-lib')

const l = getLogger('server')

/**
 * @private
 */
const loggerMiddleware = async (ctx, next) => {
  await next()

  const { method, url, renderType = 'INTERNAL' } = ctx

  l.star(
    '%s %s %s',
    colors.green(method),
    colors.green.underline(url),
    colors.gray(`(${renderType.toUpperCase()})`)
  )
}

module.exports = loggerMiddleware
