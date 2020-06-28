const INIT_CONFIG_YARGS_CONFIG = {
  command: 'init-config',
  describe: 'Create a new configuration file',
  alias: 'c',
  builder: {
    minify: {
      description: 'Minify generated JSON',
      type: 'boolean'
    },

    indent: {
      description: 'Number of spaces to indent with',
      demandOption: true,
      type: 'number',
      default: 2
    }
  }
}

module.exports = INIT_CONFIG_YARGS_CONFIG
