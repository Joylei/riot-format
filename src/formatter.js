export default class Formatter {
  constructor(value) {
    this.value = value;
  }

  toString() {
    //apply auto format
    if (this.value instanceof Date && !isNaN(this.value.valueOf())) {
      return this.date('default').toString();
    }
    return String(this.value);
  }

  valueOf() {
    return this.value;
  }
};

export function extend(name, fn) {
  if (typeof name == 'string' && typeof fn == 'function') {
    Formatter.prototype[name] = function (...args) {
      this.value = fn.apply(null, [this.valueOf()].concat(args));
      return this;
    };
  }
};