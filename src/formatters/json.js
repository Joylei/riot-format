import { extend} from '../format'

extend('json', function json (input) {
  return JSON.stringify(input)
})
