const PRINT_CONFIG_YARGS_CONFIG = {
  command: 'print-config',
  describe: 'Log the merged configuration to the console',
  alias: 'p',
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
    },

    'no-color': {
      description: 'Disable syntax highlighting',
      type: 'boolean',
      alias: 'bw'
    }
  }
}

module.exports = PRINT_CONFIG_YARGS_CONFIG
