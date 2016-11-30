# Get Started

## install it from npm

```sh
npm install -D riot-format
```

## Use it with riot

let's define a riot tag

```html
<app>
  <p>Today is { format(now, 'date', 'yyyy-mm-dd') }</p>

  this.now = new Date()
<app>
```

mixin it before you can use it

```js
import format from 'riot-format'
import * as riot from 'riot'
format(riot) //mixin globally

riot.mount('app')
```

## Use it directly without riot

```js
import { format } from 'riot-format'
let formatter = format(new Date(), 'date', 'yyyy-mm-dd')
console.log(formatter.current)
//Note: formatter.current is lazily evaluated until you access it
```

## More

- [Advanced Usage](advanced.md)

- [How to extend](extend.md)

- [API](api.md)

- [Typings](../src/index.d.ts)

- [Examples](../examples)