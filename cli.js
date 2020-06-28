#!/usr/bin/env node

const path = require('path')
const yArgs = require('yargs')
const colors = require('colors')
const { Signale } = require('signale')
const signaleTypes = require('signale/types')
const updateNotifier = require('update-notifier')
const _uniq = require('lodash/uniq')
const _values = require('lodash/values')
const getConfig = require('./lib/config')
const commands = require('./lib/commands')
const manifest = require('./package.json')

updateNotifier({ pkg: manifest }).notify()

const logLevels = _uniq(_values(signaleTypes).map(({ logLevel }) => logLevel))

const y = yArgs
  .scriptName('sermit')
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
    global: true,
    normalize: true
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
    const { l, path: rawPath } = argv
    const cwd = process.cwd()
    const basePath = rawPath[0] === '/'
      ? rawPath
      : path.join(cwd, rawPath)

    const config = await getConfig({ basePath })
    const { state } = config
    const { md, configPath, template } = state

    if (configPath) {
      l.star('read config from %s', colors.bgGreen.black(configPath))
    }

    l.star('using template %s', colors.cyan(template.name))

    md.pluginNames.forEach((name) => {
      l.star('using md plugin %s', colors.yellow(name))
    })

    // eslint-why save config on args context
    /* eslint-disable-next-line require-atomic-updates */
    argv.config = config

    // eslint-why save config on args context
    /* eslint-disable-next-line require-atomic-updates */
    argv.path = basePath
  })
  .example('$0 gen-config > .sermitrc.json', 'Generate basic configuration')
  .showHelpOnFail(false, 'Specify --help for available options')
  .help()
  .version()
  .recommendCommands()

commands.forEach((def) => { y.command(def) })

y.parse()
