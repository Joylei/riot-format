# How to extend

Beside the built-in format methods, you can define your own format methods.

Also you can override existing format methods by providing one with the same name.

## Extend formatters

```js
import { extend } from 'riot-format';
extend('yesno', function(value) {
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

## Pipes

define another method

```js
import { extend } from 'riot-format';
extend('isToday', function(value) {
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

## More

- [Get Started](getstarted.md)

- [Advanced Usage](advanced.md)

- [API](api.md)

- [Typings](../src/index.d.ts)

- [Examples](../examples)

- [Demo](https://jsfiddle.net/wgs22gkg/)