#!/usr/bin/env node

const path = require('path')
const colors = require('colors')
const { createServer, getLogger, getConfig } = require('./lib')

const DEFAULT_PORT = 8960
const DEFAULT_HOST = 'localhost'

const basePath = process.cwd()
const host = DEFAULT_HOST
const port = DEFAULT_PORT

const l = getLogger('cli')

getConfig(basePath).then((config) => {
  const { state } = config
  const { md, configPath } = state

  if (configPath) {
    l.success('loaded user config from %s', colors.bgGreen.black(configPath))
  } else {
    l.info('using default config')
  }

  md.pluginNames.forEach((name) => {
    l.info('using md plugin %s', colors.yellow(name))
  })

  const server = createServer({
    config,
    basePath,
    assetPath: path.join(__dirname, '/public')
  })

  server.listen(port)

  l.star(
    '%s',
    colors.cyan.underline(
      `listening at ${colors.bold(`http://${host}:${port}`)}`
    )
  )
}).catch((e) => {
  l.error('%s', e.stack)
})
