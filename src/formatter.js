import dateFormat from './dateFormat';

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
}

extend('date', function(input, pattern){
  return dateFormat(input, pattern);
});

extend('number', function(input, fractionSize){
  if(fractionSize == undefined || fractionSize<0){
    fractionSize = 2;
  }
  let num = new Number(input);
  if(isNaN(num.valueOf()) ){
    return input;
  }
  if(!isFinite(num.valueOf())){
    return num.valueOf() < 0 ? '-∞' : '∞';
  }
  return num.toFixed(fractionSize).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
});

extend('bytes', function (input, fractionSize,defaultValue) {
  var num = new Number(input);
  if(fractionSize == undefined || fractionSize<0){
    fractionSize = 2;
  }
  defaultValue = defaultValue || '--';
  if(isNaN(num.valueOf()) || num < 0){
    return defaultValue;
  }
  if(num < 1024){
    return num.toFixed(0) + '';
  }
  if(num < 1024 * 1024){
    return (num / 1024).toFixed(fractionSize) + 'K';
  }
  if(num < 1024 * 1024 * 1024){
    return (num / (1024 * 1024)).toFixed(fractionSize) + 'M';
  }
  return (num / (1024 * 1024 * 1024)).toFixed(fractionSize) + 'G';
});

const concat = Array.prototype.concat;
export function extend(name, fn) {
  if (typeof name == 'string' && typeof fn == 'function') {
    Formatter.prototype[name] = function() {
      var args = concat.apply([this.valueOf()],arguments);
      this.value = fn.apply(null, args);
      return this;
    };
  }
}
