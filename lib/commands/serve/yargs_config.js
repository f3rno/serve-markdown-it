const SERVE_YARGS_CONFIG = {
  command: ['serve [path] [options]', '$0 [command] [options]'],
  describe: 'Serve local files',
  alias: 's',
  builder: {
    port: {
      default: 8960,
      describe: 'Port number to spawn HTTP server on',
      demandOption: true,
      type: 'number'
    }
  }
}

module.exports = SERVE_YARGS_CONFIG
