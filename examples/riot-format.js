(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define('riot-format', ['exports'], factory) :
  (factory((global.riotFormat = global.riotFormat || {})));
}(this, (function (exports) { 'use strict';

/**
 * a decorator class to format value
 * @class
 */
var Formatter = function Formatter (value) {
  this.value = value;
};

/**
 * @description format the value to String
 * @returns {String}
 */
Formatter.prototype.toString = function toString () {
  // apply auto format
  if (this.value instanceof Date && !isNaN(this.value.valueOf())) {
    var date = this.date;
    if(typeof date === 'function'){
      return date.call(this, 'default').toString();
    }
  }
  return String(this.value)
};

/**
 * get current value
 */
Formatter.prototype.valueOf = function valueOf () {
  return this.value
};

/**
 * Forbidden names when define formatters or retrieve formatter
 * @constant
 */
var ForbiddenMethods = ['value', 'toString', 'valueOf'];

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
function format (value, method) {
  var args = [], len = arguments.length - 2;
  while ( len-- > 0 ) args[ len ] = arguments[ len + 2 ];

  var self = new Formatter(value);
  if (typeof method == 'string' && ForbiddenMethods.indexOf(method)==-1) {
    var fn = self[method];
    if (typeof fn === 'function') {
      fn.apply(self, args);
    }else if(!fn){
        throw new Error('method not found: ' + method);
    }
  }
  return self
}

/**
 * @param {String} method method name
 * @param {Function} fn method body
 */
function defineFormatter (method, fn) {
  if (typeof method == 'string' && ForbiddenMethods.indexOf(method)==-1 && typeof fn == 'function') {
    Formatter.prototype[method] = function () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      this.value = fn.apply(null, [this.valueOf()].concat(args));
      return this
    };
  }
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
function extend (name, fn) {
  if (typeof name === 'object') {
    var obj = name;
    for (var key in obj) {
      defineFormatter(key, obj[key]);
    }
  }else {
    defineFormatter(name , fn);
  }
}

// taken from http://stevenlevithan.com/assets/misc/date.format.js
/*
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 */

var dateFormat = function () {
  var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
    timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
    timezoneClip = /[^-+\dA-Z]/g,
    pad = function (val, len) {
      val = String(val);
      len = len || 2;
      while (val.length < len) { val = '0' + val; }
      return val
  };

  // Regexes and supporting functions are cached through closure
  return function (date, mask, utc) {
    var dF = dateFormat;

    // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
    if (arguments.length == 1 && Object.prototype.toString.call(date) == '[object String]' && !/\d/.test(date)) {
      mask = date;
      date = undefined;
    }

    // Passing date through Date applies Date.parse, if necessary
    date = date ? new Date(date) : new Date;
    if (isNaN(date)) { throw SyntaxError('invalid date') }

    mask = String(dF.masks[mask] || mask || dF.masks['default']);

    // Allow setting the utc argument via the mask
    if (mask.slice(0, 4) == 'UTC:') {
      mask = mask.slice(4);
      utc = true;
    }

    var _ = utc ? 'getUTC' : 'get',
      d = date[_ + 'Date'](),
      D = date[_ + 'Day'](),
      m = date[_ + 'Month'](),
      y = date[_ + 'FullYear'](),
      H = date[_ + 'Hours'](),
      M = date[_ + 'Minutes'](),
      s = date[_ + 'Seconds'](),
      L = date[_ + 'Milliseconds'](),
      o = utc ? 0 : date.getTimezoneOffset(),
      flags = {
        d: d,
        dd: pad(d),
        ddd: dF.i18n.dayNames[D],
        dddd: dF.i18n.dayNames[D + 7],
        m: m + 1,
        mm: pad(m + 1),
        mmm: dF.i18n.monthNames[m],
        mmmm: dF.i18n.monthNames[m + 12],
        yy: String(y).slice(2),
        yyyy: y,
        h: H % 12 || 12,
        hh: pad(H % 12 || 12),
        H: H,
        HH: pad(H),
        M: M,
        MM: pad(M),
        s: s,
        ss: pad(s),
        l: pad(L, 3),
        L: pad(L > 99 ? Math.round(L / 10) : L),
        t: H < 12 ? 'a' : 'p',
        tt: H < 12 ? 'am' : 'pm',
        T: H < 12 ? 'A' : 'P',
        TT: H < 12 ? 'AM' : 'PM',
        Z: utc ? 'UTC' : (String(date).match(timezone) || ['']).pop().replace(timezoneClip, ''),
        o: (o > 0 ? '-' : '+') + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
        S: ['th', 'st', 'nd', 'rd'][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
    };

    return mask.replace(token, function ($0) {
      return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1)
    })
  }
}();

// Some common format strings
dateFormat.masks = {
  'default': 'ddd mmm dd yyyy HH:MM:ss',
  shortDate: 'm/d/yy',
  mediumDate: 'mmm d, yyyy',
  longDate: 'mmmm d, yyyy',
  fullDate: 'dddd, mmmm d, yyyy',
  shortTime: 'h:MM TT',
  mediumTime: 'h:MM:ss TT',
  longTime: 'h:MM:ss TT Z',
  isoDate: 'yyyy-mm-dd',
  isoTime: 'HH:MM:ss',
  isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
  isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
  dayNames: [
    'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ],
  monthNames: [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ]
};

dateFormat.polyfill = function () {
  // For convenience...
  Date.prototype.format = function (mask, utc) {
    return dateFormat(this, mask, utc)
  };
};

extend('date', function date (input, pattern) {
  return dateFormat(input, pattern)
});

extend('number', function number (input, fractionSize) {
  if (fractionSize === void 0 || fractionSize < 0) {
    fractionSize = 2;
  }
  var num = Number(input);
  if (isNaN(num.valueOf())) {
    return input
  }
  if (!isFinite(num.valueOf())) {
    return num.valueOf() < 0 ? '-∞' : '∞'
  }
  return num.toFixed(fractionSize).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
});

extend('bytes', function bytes (input, fractionSize , defaultValue) {
  if ( fractionSize === void 0 ) fractionSize = 2;
  if ( defaultValue === void 0 ) defaultValue = '--';

  var num = new Number(input);

  if (isNaN(num.valueOf()) || num < 0) {
    return defaultValue
  }
  if (fractionSize < 0) {
    fractionSize = 2;
  }

  if (num < 1024) {
    return num.toFixed(0) + ''
  }
  if (num < 1024 * 1024) {
    return (num / 1024).toFixed(fractionSize) + 'K'
  }
  if (num < 1024 * 1024 * 1024) {
    return (num / (1024 * 1024)).toFixed(fractionSize) + 'M'
  }
  return (num / (1024 * 1024 * 1024)).toFixed(fractionSize) + 'G'
});

extend('json', function json (input) {
  return JSON.stringify(input)
});

// import built-in formatters
/**
 * mixin format globally
 * @param {any} riot riot module object
 * @example
 * import * as riot from 'riot';
 * use(riot);
 */
function use(riot) {
  riot.mixin({format: format});
}

/**
 * same as extend()
 * @see extend
 * @deprecated
 */
use.define = function () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  console.warn('define() is deprecated, use extend() instead.');
  return extend(args)
};

use.extend = extend;

use.format = format;

exports['default'] = use;
exports.format = format;
exports.extend = extend;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=riot-format.js.map
