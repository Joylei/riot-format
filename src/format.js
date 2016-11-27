import Formatter from './formatter';

/**
* format a given value in the riot tag context
* usage:
*   create a riot tag
* <pre>
*   <app>
      <p> {format(new Date(), 'date', 'yyyy-mm-dd HH:MM:ss')} </p>
*   </app>
* </pre>
* @param {any} value      the value passed in to be formatted
* @param {string} method  the format method of Formatter
* @return {any} the formatted result
*/
export default function format(value, method, ...args) {
    const self = new Formatter(value);
    if (typeof method == 'string' && method != 'toString' && method != 'valueOf') {
        const fn = self[method];
        if (typeof fn === 'function') {
            fn.apply(self, args);
        }
    }
    return self;
};