const SERVE_YARGS_CONFIG = {
  command: 'serve [path] [options]',
  describe: 'Serve local files',
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
