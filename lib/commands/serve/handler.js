const colors = require('colors')
const createServer = require('../../server')

/**
 * @private
 */
const SERVE_HANDLER = async (argv) => {
  const { l, port, config, path } = argv
  const server = await createServer({ basePath: path, config })

  server.listen(port)

  l.star('server content from %s', colors.underline(path))
  l.star(
    '%s',
    colors.cyan.underline(
      `listening at ${colors.bold(`http://localhost:${port}`)}`
    )
  )
}

module.exports = SERVE_HANDLER
