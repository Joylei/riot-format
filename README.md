# riot-format
a helper library for riotjs to format displays

# usage
## basic
import riot-format
```js
let riot = require('riot');
require('riot-format')(riot);
```

define a tag
```html
<app>
  <p>{format(new Date(), 'date', 'yyyy-MM-dd')}</p>
</app>
```
## extend
define your own format method
```js
let Formatter = require('riot-format').Formatter;
Formatter.prototype.yesno = function(){
  if(!!this.value){
    this.value = 'yes';
  }
  this.value = 'no';
};
```
let's use this method
```html
<app>
  <p>should display yes: {format(1, 'yesno')}</p>
  <p>should display no: {format(null, 'yesno')}</p>
</app>
```

## chained call
define another method
```js
let Formatter = require('riot-format').Formatter;
Formatter.prototype.isToday = function(){
  if(this.value){
    let date = (this.value instanceof Date ? this.value : new Date(this.value);
    if(!isNaN(date)){
      if(date.format('yyyyMMdd') == new Date().format('yyyyMMdd')){
        this.value = true
      }
    }
  }

  this.value = false;
};
```
use it
```html
<app>
  <p>should display true: {format(new Date(), 'date').isToday()}</p>
</app>
```

# example
run example by
```
npm start
```
