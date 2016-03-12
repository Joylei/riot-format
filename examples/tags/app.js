
(function(tagger) {
  if (typeof define === 'function' && define.amd) {
    define(function(require, exports, module) { tagger(require('riot'), require, exports, module)})
  } else if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    tagger(require('riot'), require, exports, module)
  } else {
    tagger(window.riot)
  }
})(function(riot, require, exports, module) {
riot.tag2('app', '<p>today is {format(now, \'date\', \'yyyy-mm-dd HH:MM:ss\')}</p> <p>should display yes: {format(1, \'yesno\')}</p> <p>should display no: {format(null, \'yesno\')}</p> <p>should display true: {format(new Date().toString()).date().isToday()}</p>', '', '', function(opts) {
  var self = this;
  this.now = new Date();
  var id = setInterval(function(){
    self.now = new Date();
    self.update();
  });
  self.on('unmount', function(){
    clearInterval(id);
  });
}, '{ }');
});