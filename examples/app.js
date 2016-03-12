define(function(require, exports, module) {
  var riot = require('riot');
  var format = require('riot-format');
  format(riot);

  format.define('isToday', function(value) {
    if (value) {
      var date = (value instanceof Date) ? value : new Date(value);
      if (!isNaN(date)) {
        var now = new Date();
        if (('' + date.getYear() + date.getMonth() + date.getDate()) === ('' + now.getYear() + now.getMonth() + now.getDate())) {
          return true;
        }
      }
    }
    return false;
  });


  format.define('yesno', function(value) {
    return !!value ? 'yes' : 'no';
  });

  require('./tags/app.js');
  riot.mount('app');
});
