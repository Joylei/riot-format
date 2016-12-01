# Advanced Usage

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


## More

- [Get Started](getstarted.md)

- [How to extend](extend.md)

- [API](api.md)

- [Typings](../src/index.d.ts)

- [Examples](../examples)

- [Demo](https://jsfiddle.net/wgs22gkg/)