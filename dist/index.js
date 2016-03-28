(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', './formatter'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, require('./formatter'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, global.formatter);
    global.index = mod.exports;
  }
})(this, function (module, _formatter) {
  'use strict';

  var _formatter2 = _interopRequireDefault(_formatter);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var slice = Array.prototype.slice;

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
    var self = new _formatter2.default(value);
    if (typeof method == 'string' && method != 'toString' && method != 'valueOf') {
      var fn = self[method];
      if (typeof fn === 'function') {
        var args = slice.call(arguments, 2);
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

  hook.define = _formatter.extend;

  module.exports = hook;
});
//# sourceMappingURL=index.js.map