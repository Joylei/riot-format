(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './dateFormat'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./dateFormat'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.dateFormat);
    global.formatter = mod.exports;
  }
})(this, function (exports, _dateFormat) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.extend = extend;

  var _dateFormat2 = _interopRequireDefault(_dateFormat);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var Formatter = function () {
    function Formatter(value) {
      _classCallCheck(this, Formatter);

      this.value = value;
    }

    _createClass(Formatter, [{
      key: 'toString',
      value: function toString() {
        //apply auto format
        if (this.value instanceof Date && !isNaN(this.value.valueOf())) {
          return this.date('default').toString();
        }
        return String(this.value);
      }
    }, {
      key: 'valueOf',
      value: function valueOf() {
        return this.value;
      }
    }]);

    return Formatter;
  }();

  exports.default = Formatter;


  extend('date', function (input, pattern) {
    return (0, _dateFormat2.default)(input, pattern);
  });

  extend('number', function (input, fractionSize) {
    if (fractionSize == undefined || fractionSize < 0) {
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

  extend('bytes', function (input, fractionSize, defaultValue) {
    var num = new Number(input);
    if (fractionSize == undefined || fractionSize < 0) {
      fractionSize = 2;
    }
    defaultValue = defaultValue || '--';
    if (isNaN(num.valueOf()) || num < 0) {
      return defaultValue;
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

  var concat = Array.prototype.concat;
  function extend(name, fn) {
    if (typeof name == 'string' && typeof fn == 'function') {
      Formatter.prototype[name] = function () {
        var args = concat.apply([this.valueOf()], arguments);
        this.value = fn.apply(null, args);
        return this;
      };
    }
  }
});
//# sourceMappingURL=formatter.js.map