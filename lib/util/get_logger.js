const { Signale } = require('signale')
const _isEmpty = require('lodash/isEmpty')

const coreLogger = new Signale({ scope: 'core' })

/**
 * @external signale
 * @see https://github.com/klaussinani/signale
 */

/**
 * Creates a new scoped {@link external:signale} logger instance.
 *
 * @param {string} scope - scope
 * @returns {Signale} l
 * @example
 * const l = getLogger('template:render-md')
 */
const getLogger = scope => (
  _isEmpty(scope)
    ? coreLogger
    : new Signale({ scope })
)

module.exports = getLogger
