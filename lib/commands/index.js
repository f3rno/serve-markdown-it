const initTemplateCommand = require('./init_template')
const printConfigCommand = require('./print_config')
const initConfigCommand = require('./init_config')
const renderCommand = require('./render')
const serveCommand = require('./serve')

const COMMANDS = [
  initTemplateCommand,
  printConfigCommand,
  initConfigCommand,
  renderCommand,
  serveCommand
]

module.exports = COMMANDS
