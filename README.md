# riot-format

a helper library for riotjs to format displays

[![NPM version][npm-version-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![MIT License][license-image]][license-url]

For typings, see [npm-riot-format](https://github.com/Joylei/npm-riot-format.git)

## Format methods

All parameters are optional.

### date(formatMask?: string = 'default', utc?: boolean = false)

convert input to date and format by specified mask

Pre-defined format masks:

- default: "ddd mmm dd yyyy HH:MM:ss",
- shortDate: "m/d/yy",
- mediumDate: "mmm d, yyyy",
- longDate: "mmmm d, yyyy",
- fullDate: "dddd, mmmm d, yyyy",
- shortTime: "h:MM TT",
- mediumTime: "h:MM:ss TT",
- longTime: "h:MM:ss TT Z",
- isoDate: "yyyy-mm-dd",
- isoTime: "HH:MM:ss",
- isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
- isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"

mask supported flags:

- d : day number of a month without padding 0 on the left
- dd : day number of a month with padding 0 on the left
- ddd : short day name of a week
- dddd : full day name of a week
- m : month number without padding 0 on the left
- mm : month number with padding 0 on the left
- mmm: short name of month
- mmmm: full name of month
- yy : short display of year, eg 15 for 2015
- yyyy: full display of year, eg 2015
- h : hours part of the date without padding 0 on the left in 12 hours format
- hh : hours part of the date with padding 0 on the left in 12 hours format
- H : hours part of the date without padding 0 on the left in 24 hours format
- HH : hours part of the date with padding 0 on the left in 24 hours format
- M : minutes part of the date without padding 0 on the left
- MM : minutes part of the date with padding 0 on the left
- s : seconds part of the date without padding 0 on the left
- ss : seconds part of the date with padding 0 on the left
- l: milliseconds part of the date
- L : milliseconds part of the date
- t : a | p , short for am | pm
- tt: am | pm
- T: A | P, short for AM | PM
- TT: AM | PM
- Z: timezone

### number(fractionSize?: Number = 2)

convert input to a fixed number.
if it's a infinite number, it will be displayed as '-∞' or '∞'

### bytes(fractionSize?: Number = 2, defaultValue?:string = '--')

format number in K( > 1024), M( > 1024*1024), G( > 1024*1024*1024).
if not a number or number below 0, display the default value.

eg: -1 as --, 5 as 5, 2345 as 2.29K

### json()

convert input to JSON string

## Usage

### use format as global method, so that you can use it with riot or without riot

```js
import { format } from 'riot-format';
//make it global;
window.format = format;

console.log(format(new Date(), 'date').current);
```

```html
<app>
{ format(new Date()) }
</app>
```

Note: this way the format method is available for all tags.

### use it as riot mixin

#### mixin globally

```js
import format from 'riot-format';
import * as riot from 'riot';
format(riot);//mixin it globally
```

Note: you should mixin it before you import any riot tags. The format method is availalbe for all tags.

#### you can also mixin it as you need

```js
//app.js
import { format } from 'riot-format';
riot.mixin('riot-format', {
  format
})
```

```html
<app>
  <span>{ format(new Date()) }</span>
  this.mixin('riot-format');
</app>
```

Note: in this case the format method is available in the tag you defined.

### no mixin, use it directly

```html
import {format} from 'riot-format';
<app>
  <span>{ format(new Date()) }</span>
</app>
```

Note: this way format is supposed to be available in the tag you defined.

Besides these  methods, you can define more formatters as you need.

## Extend formatters

define your own format method

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

## Example

run example by

```sh
npm start
```

## License

MIT

[license-image]:http://img.shields.io/badge/license-MIT-000000.svg?style=flat-square
[license-url]:LICENSE

[npm-version-image]:http://img.shields.io/npm/v/riot-format.svg?style=flat-square
[npm-downloads-image]:http://img.shields.io/npm/dm/riot-format.svg?style=flat-square
[npm-url]:https://npmjs.org/package/riot-format