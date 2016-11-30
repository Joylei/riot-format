# API

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

## More

- [Advanced Usage](advanced.md)

- [How to extend](extend.md)

- [Typings](../src/index.d.ts)

- [Examples](../examples)