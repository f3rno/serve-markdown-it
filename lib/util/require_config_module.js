const resolveGlobal = require('resolve-global')

/**
 * @private
 */
const requireConfigModule = (moduleName) => {
  let modulePath = require.resolve(moduleName, {
    paths: [
      __dirname,
      process.cwd()
    ]
  })

  if (!modulePath) {
    const globalModulePath = resolveGlobal(moduleName)

    if (globalModulePath) {
      modulePath = globalModulePath
    } else {
      throw new Error(`Config module not found: ${moduleName}`)
    }
  }

  // eslint-why dynamic require.
  /* eslint-disable unicorn/no-abusive-eslint-disable */
  // eslint-why config load.
  /* eslint-disable-next-line */
  return require(modulePath)
}

module.exports = requireConfigModule
