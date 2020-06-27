/**
 * Stub to intercept handlers in the future if necessary.
 *
 * @private
 */
const cmdHandler = exec => async function handler (argv) {
  await exec(argv)
}

module.exports = cmdHandler
