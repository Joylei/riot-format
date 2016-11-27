'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var riot = _interopDefault(require('riot'));

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};



function unwrapExports (x) {
	return x && x.__esModule ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
};















var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

















var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

var riotFormat = createCommonjsModule(function (module, exports) {
  (function (global, factory) {
    (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? factory(exports) : typeof define === 'function' && define.amd ? define('riot-format', ['exports'], factory) : factory(global.riotFormat = global.riotFormat || {});
  })(commonjsGlobal, function (exports) {
    'use strict';

    var Formatter = function Formatter(value) {
      this.value = value;
    };

    Formatter.prototype.toString = function toString() {
      //apply auto format
      if (this.value instanceof Date && !isNaN(this.value.valueOf())) {
        return this.date('default').toString();
      }
      return String(this.value);
    };

    Formatter.prototype.valueOf = function valueOf() {
      return this.value;
    };

    function extend(name, fn) {
      if (typeof name == 'string' && typeof fn == 'function') {
        Formatter.prototype[name] = function () {
          var args = [],
              len = arguments.length;
          while (len--) {
            args[len] = arguments[len];
          }this.value = fn.apply(null, [this.valueOf()].concat(args));
          return this;
        };
      }
    }

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
      var args = [],
          len = arguments.length - 2;
      while (len-- > 0) {
        args[len] = arguments[len + 2];
      }var self = new Formatter(value);
      if (typeof method == 'string' && method != 'toString' && method != 'valueOf') {
        var fn = self[method];
        if (typeof fn === 'function') {
          fn.apply(self, args);
        }
      }
      return self;
    }

    //taken from http://stevenlevithan.com/assets/misc/date.format.js
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
          pad = function pad(val, len) {
        val = String(val);
        len = len || 2;
        while (val.length < len) {
          val = "0" + val;
        }
        return val;
      };

      // Regexes and supporting functions are cached through closure
      return function (date, mask, utc) {
        var dF = dateFormat;

        // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
        if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
          mask = date;
          date = undefined;
        }

        // Passing date through Date applies Date.parse, if necessary
        date = date ? new Date(date) : new Date();
        if (isNaN(date)) {
          throw SyntaxError("invalid date");
        }

        mask = String(dF.masks[mask] || mask || dF.masks["default"]);

        // Allow setting the utc argument via the mask
        if (mask.slice(0, 4) == "UTC:") {
          mask = mask.slice(4);
          utc = true;
        }

        var _ = utc ? "getUTC" : "get",
            d = date[_ + "Date"](),
            D = date[_ + "Day"](),
            m = date[_ + "Month"](),
            y = date[_ + "FullYear"](),
            H = date[_ + "Hours"](),
            M = date[_ + "Minutes"](),
            s = date[_ + "Seconds"](),
            L = date[_ + "Milliseconds"](),
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
          t: H < 12 ? "a" : "p",
          tt: H < 12 ? "am" : "pm",
          T: H < 12 ? "A" : "P",
          TT: H < 12 ? "AM" : "PM",
          Z: utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
          o: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
          S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
        };

        return mask.replace(token, function ($0) {
          return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
        });
      };
    }();

    // Some common format strings
    dateFormat.masks = {
      "default": "ddd mmm dd yyyy HH:MM:ss",
      shortDate: "m/d/yy",
      mediumDate: "mmm d, yyyy",
      longDate: "mmmm d, yyyy",
      fullDate: "dddd, mmmm d, yyyy",
      shortTime: "h:MM TT",
      mediumTime: "h:MM:ss TT",
      longTime: "h:MM:ss TT Z",
      isoDate: "yyyy-mm-dd",
      isoTime: "HH:MM:ss",
      isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
      isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
    };

    // Internationalization strings
    dateFormat.i18n = {
      dayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    };

    dateFormat.polyfill = function () {
      // For convenience...
      Date.prototype.format = function (mask, utc) {
        return dateFormat(this, mask, utc);
      };
    };

    extend('date', function date(input, pattern) {
      return dateFormat(input, pattern);
    });

    extend('number', function number(input, fractionSize) {
      if (fractionSize === void 0 || fractionSize < 0) {
        fractionSize = 2;
      }
      var num = new Number(input);
      if (isNaN(num.valueOf())) {
        return input;
      }
      if (!isFinite(num.valueOf())) {
        return num.valueOf() < 0 ? '-∞' : '∞';
      }
      return num.toFixed(fractionSize).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    });

    extend('bytes', function bytes(input, fractionSize, defaultValue) {
      if (fractionSize === void 0) fractionSize = 2;
      if (defaultValue === void 0) defaultValue = '--';

      var num = new Number(input);

      if (isNaN(num.valueOf()) || num < 0) {
        return defaultValue;
      }
      if (fractionSize < 0) {
        fractionSize = 2;
      }

      if (num < 1024) {
        return num.toFixed(0) + '';
      }
      if (num < 1024 * 1024) {
        return (num / 1024).toFixed(fractionSize) + 'K';
      }
      if (num < 1024 * 1024 * 1024) {
        return (num / (1024 * 1024)).toFixed(fractionSize) + 'M';
      }
      return (num / (1024 * 1024 * 1024)).toFixed(fractionSize) + 'G';
    });

    extend('json', function json(input) {
      return JSON.stringify(input);
    });

    //import built-in formatters
    function hook(riot$$1) {

      // if (!riot.Tag.prototype.format) {
      //   riot.Tag.prototype.format = format;
      // }

      riot$$1.mixin({
        format: format
      });
    }

    hook.define = extend;

    hook.format = format;

    exports['default'] = hook;
    exports.define = extend;
    exports.format = format;

    Object.defineProperty(exports, '__esModule', { value: true });
  });
  });

var format = unwrapExports(riotFormat);

format(riot);

format.define('isToday', function (value) {
  if (value) {
    var date = value instanceof Date ? value : new Date(value);
    if (!isNaN(date)) {
      var now = new Date();
      if ('' + date.getYear() + date.getMonth() + date.getDate() === '' + now.getYear() + now.getMonth() + now.getDate()) {
        return true;
      }
    }
  }
  return false;
});

format.define('yesno', function (value) {
  return !!value ? 'yes' : 'no';
});

riot.tag2('app', '<p>today is {format(now, \'date\', \'yyyy-mm-dd HH:MM:ss\')}</p> <p>should display yes: {format(1, \'yesno\')}</p> <p>should display no: {format(null, \'yesno\')}</p> <p>should display true: {format(new Date().toString()).date().isToday()}</p>', '', '', function (opts) {
  var self = this;
  this.now = new Date();
  var id = setInterval(function () {
    self.now = new Date();
    self.update();
  });
  self.on('unmount', function () {
    clearInterval(id);
  });
});

//has to do it this way, because import behavior
//and we want it takes effect before we import any tags
riot.mount('app');
