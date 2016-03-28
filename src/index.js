import Formatter, {extend} from './formatter';

const slice = Array.prototype.slice;

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
function format(value, method) {
  let self = new Formatter(value);
  if (typeof method == 'string' && method != 'toString' && method != 'valueOf') {
    let fn = self[method];
    if (typeof fn === 'function') {
      let args = slice.call(arguments, 2);
      fn.apply(self, args);
    }
  }
  return self;
}

function hook(riot) {
  if (!riot.Tag.prototype.format) {
    riot.Tag.prototype.format = format;
  }
}

hook.define = extend;

module.exports = hook;
