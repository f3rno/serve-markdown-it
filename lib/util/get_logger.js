const { Signale } = require('signale')
const _isEmpty = require('lodash/isEmpty')

const coreLogger = new Signale({ scope: 'core' })

/**
 * @private
 */
const getLogger = scope => (
  _isEmpty(scope)
    ? coreLogger
    : new Signale({ scope })
)

module.exports = getLogger
