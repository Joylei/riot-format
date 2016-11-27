import { extend} from '../../format'
import dateFormat from './dateFormat'

extend('date', function date (input, pattern) {
  return dateFormat(input, pattern)
})
