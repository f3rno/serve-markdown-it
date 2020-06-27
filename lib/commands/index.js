const printConfigCommand = require('./print_config')
const genConfigCommand = require('./gen_config')
const renderCommand = require('./render')
const serveCommand = require('./serve')

const COMMANDS = [
  printConfigCommand,
  genConfigCommand,
  renderCommand,
  serveCommand
]

module.exports = COMMANDS
