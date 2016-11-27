import { extend} from '../format'

extend('number', function number (input, fractionSize) {
  if (fractionSize === void 0 || fractionSize < 0) {
    fractionSize = 2
  }
  const num = Number(input)
  if (isNaN(num.valueOf())) {
    return input
  }
  if (!isFinite(num.valueOf())) {
    return num.valueOf() < 0 ? '-∞' : '∞'
  }
  return num.toFixed(fractionSize).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
})
