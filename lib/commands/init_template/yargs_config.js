const INIT_TEMPLATE_YARGS_CONFIG = {
  command: 'init-template <name>',
  describe: 'Initialize a new sermit template repo',
  builder: {
    name: {
      description: 'Template name, prefixed with "serve-markdown-it-template-"',
      demandOption: true,
      type: 'string'
    }
  }
}

module.exports = INIT_TEMPLATE_YARGS_CONFIG
