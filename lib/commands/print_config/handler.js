const chromafi = require('chromafi')

/**
 * @private
 */
const PRINT_CONFIG_HANDLER = (argv) => {
  const { indent, minify, bw, config } = argv
  const { state: _, ...logConfig } = config

  if (minify) {
    console.log(JSON.stringify(logConfig))
  } else if (bw) {
    console.log(JSON.stringify(logConfig, null, minify ? 0 : indent))
  } else {
    console.log(chromafi(logConfig, {
      lang: 'json',
      lineNumbers: true,
      tabsToSpaces: indent,
      consoleTabWidth: indent
    }))
  }
}

module.exports = PRINT_CONFIG_HANDLER
