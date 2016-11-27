/**
 * a decorator class to format value
 * @class
 */
export default class Formatter {
  constructor (value) {
    this.value = value
  }

  /**
   * @description format the value to String
   * @returns {String}
   */
  toString () {
    // apply auto format
    if (this.value instanceof Date && !isNaN(this.value.valueOf())) {
      const date = this.date;
      if(typeof date === 'function'){
        return date.call(this, 'default').toString();
      }
    }
    return String(this.value)
  }

  /**
   * get current value
   */
  valueOf () {
    return this.value
  }
}

