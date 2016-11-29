import Formatter from './formatter'
import opts from './opts'
import { slice, isString, isFunction, inArray, fail, warn } from './util'

/**
 * Forbidden names when define formatters or retrieve formatter
 * @constant
 */
const Forbiddens = ['value', 'current' ,'toString', '_value', '_error', '_chains']

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
    if (isString(method)) {
        if(inArray(Forbiddens, method)){
            warn('ignored, not allowed method: ' + method)
            return self
        }

        const fn = self[method]
        if (isFunction(fn)) {
            fn.apply(self, args)
        }else{
            fail('method not found: ' + method)
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
    if (isString(method) && isFunction(fn)) {
        if(inArray(Forbiddens, method)){
            fail('not allowed method: ' + method)
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
    fail('check parameters')
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
