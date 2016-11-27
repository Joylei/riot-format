import { format, extend } from './format'

// import built-in formatters
import './formatters'

/**
 * mixin format globally
 * @param {any} riot riot module object
 * @example
 * import * as riot from 'riot';
 * use(riot);
 */
export function use(riot) {
    riot.mixin({format})
}

/**
 * same as extend()
 * @see extend
 * @deprecated
 */
use.define = function (...args) {
    console.warn('define() is deprecated, use extend() instead.')
    return extend(...args)
}

use.extend = extend

use.format = format

// use.Formatter = Formatter
export { format, extend } from './format'

export default use