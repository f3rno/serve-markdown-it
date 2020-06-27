#!/usr/bin/env node

const path = require('path')
const yArgs = require('yargs')
const colors = require('colors')
const { Signale } = require('signale')
const signaleTypes = require('signale/types')
const updateNotifier = require('update-notifier')
const _uniq = require('lodash/uniq')
const _values = require('lodash/values')
const _includes = require('lodash/includes')
const { getConfig, commands } = require('./lib')
const serveCommand = require('./lib/commands/serve')
const manifest = require('./package.json')

updateNotifier({ pkg: manifest }).notify()

const logLevels = _uniq(_values(signaleTypes).map(({ logLevel }) => logLevel))
const {
  describe: serveDescribe,
  builder: serveBuilder,
  handler: serveHandler
} = serveCommand

const y = yArgs
  .scriptName('sermit')
  .usage('$0 [command] [options]', serveDescribe, serveBuilder, serveHandler)
  .option('log-level', {
    describe: 'Log level, increase to debug',
    default: 'error',
    choices: logLevels,
    type: 'string',
    alias: 'l',
    global: true
  })
  .option('path', {
    describe: 'Root directory',
    default: process.cwd(),
    demandOption: true,
    type: 'string',
    alias: 'p',
    global: true
  })
  .middleware((argv) => {
    const { 'log-level': logLevel } = argv
    const l = new Signale({
      logLevel,
      scope: 'cli',
      types: {
        ...signaleTypes,
        star: {
          ...signaleTypes.star,
          logLevel: 'error'
        }
      }
    })

    l.info('started [%s]', logLevel)

    argv.l = l
  })
  .middleware(async (argv) => {
    const { _, l, path: rawPath } = argv
    const cwd = process.cwd()
    const basePath = rawPath[0] === '.'
      ? path.join(cwd, rawPath.slice(1))
      : _includes(rawPath, path.sep)
        ? rawPath
        : path.join(cwd, rawPath)

    const [command] = _
    const config = await getConfig(basePath)
    const { state } = config
    const { md, configPath, template } = state

    if (configPath) {
      l.info('read config from %s', colors.bgGreen.black(configPath))
    }

    if (command === 'serve' || command === 'render') {
      l.star('using template %s', colors.cyan(template.name))

      md.pluginNames.forEach((name) => {
        l.star('using md plugin %s', colors.yellow(name))
      })
    }

    // eslint-why save config on args context
    /* eslint-disable-next-line require-atomic-updates */
    argv.config = config

    // eslint-why save config on args context
    /* eslint-disable-next-line require-atomic-updates */
    argv.path = basePath
  })
  .help()

commands.forEach((def) => { y.command(def) })

y.parse()
