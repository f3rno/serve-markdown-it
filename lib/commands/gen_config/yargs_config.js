const GEN_CONFIG_YARGS_CONFIG = {
  command: 'gen-config',
  describe: 'Generate a new configuration file',
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

module.exports = GEN_CONFIG_YARGS_CONFIG
