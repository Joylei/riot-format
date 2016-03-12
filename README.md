# riot-format
a helper library for riotjs to format displays

# usage

currently there is only one pre-defined formatter: date().

anyway, you can define more formatters as you need.

## basic
import riot-format
```js
let riot = require('riot');
require('riot-format')(riot);
```

define a tag
```html
<app>
  <p>{format(new Date(), 'date', 'yyyy-mm-dd')}</p>
</app>
```
## extend
define your own format method
```js
let format = require('riot-format');
format.define('yesno', function(value) {
  return !!value ? 'yes' : 'no';
});
```
let's use this method
```html
<app>
  <p>should display yes: {format(1, 'yesno')}</p>
  <p>should display no: {format(null, 'yesno')}</p>
  <p>or use like this: {format(1).yesno()}</p>
</app>
```
Note: it should be easy to understand how it works if you are familiar with pipes.

## pipes
define another method
```js
let format = require('riot-format');
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
```
use it
```html
<app>
  <p>should display true: {format(new Date().toString()).date().isToday()}</p>
</app>
```

# example
run example by
```
npm start
```
