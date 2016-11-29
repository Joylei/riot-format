import Formatter from './formatter'
import opts from './opts'

const slice = Array.prototype.slice

/**
 * Forbidden names when define formatters or retrieve formatter
 * @constant
 */
const ForbiddenMethods = ['value', 'toString', 'valueOf', '_value', '_error', '_chains']

/**
* format a given value in the riot tag context
* @example <caption>use it globally</caption>
* format(new Date(), 'date');
* @example <caption>use it with riot</caption>
* window.format = format;
* 
* //define a riot tag
*   <app>
*      <p> {format(new Date(), 'date', 'yyyy-mm-dd HH:MM:ss')} </p>
*   </app>
* @param {any} value      the value passed in to be formatted
* @param {string} method  the format method to be used
* @returns {Formatter} the Formatter instance
*/
export function format (value, method) {
    const self = new Formatter(value)
    const args = slice.call(arguments, 2)
    if (typeof method == 'string') {
        if(ForbiddenMethods.indexOf(method)!==-1){
            console.warn('ignored, not allowed method name: ' + method)
            return
        }

        const fn = self[method]
        if (typeof fn === 'function') {
            fn.apply(self, args)
        }else if(!fn){
            throw new Error('method not found: ' + method)
        }
    }
    return self
}

format.opts = opts

/**
 * @param {String} method method name
 * @param {Function} fn method body
 */
function defineFormatter (method, fn) {
    if (typeof method == 'string' && typeof fn == 'function') {
        if(ForbiddenMethods.indexOf(method)!==-1){
            throw new Error('not allowed method name: ' + method)
        }

        const format = function () {
            const args = slice.call(arguments, 0)
            let chains = this._chains
            if(!chains){
                chains = []
            }
            chains.push(function(value){
                args.unshift(value)
                return fn.apply(null, args)
            })
            this._chains = chains
            return this
        }
        format._def = fn
        Formatter.prototype[method] = format
        return
    }
    throw new Error('check your parameters')
}

/**
 * @description extend with custom formatters
 * @example
 *  extend('yesno', function(input){
 *      return !!input ? 'yes' : 'no';
 *  });
 * @example
 *  extend({
 *      yes: function(input){
 *          return !!input ? 'yes' : '';
 *      },
 *      no: function(input){
 *          return !!!input ? 'no' : '';
 *      }
 *  });
 * 
 * @param {String|Object} name if name is Object, means mutiple format methods;
 *  otherwise it is method name, should be used with fn
 * @param {Function} fn should be used if name is String
 */
export function extend (name, fn) {
    if (typeof name === 'object') {
        const obj = name
        for (let key in obj) {
            defineFormatter(key, obj[key])
        }
    }else {
        defineFormatter(name , fn)
    }
}
