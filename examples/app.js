define(function(require, exports, module) {
  var riot = require('riot');
  var format = require('riot-format');
  format(riot);

  var Formatter = format.Formatter;

  Formatter.prototype.isToday = function(){
    if(this.value){
      var date = (this.value instanceof Date) ? this.value : new Date(this.value);
      if(!isNaN(date)){
        var now = new Date();
        if((''+date.getYear()+date.getMonth()+date.getDate()) === (''+now.getYear()+now.getMonth()+now.getDate())){
          this.value = true;
          return this;
        }
      }
    }

    this.value = false;
    return this;
  };

  Formatter.prototype.yesno = function(){
    if(!!this.value){
      this.value = 'yes';
      return this;
    }
    this.value = 'no';
    return this;
  };

  require('./tags/app.js');
  riot.mount('app');
});
