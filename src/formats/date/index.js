import {
    extend
} from '../../formatter';
import dateFormat from './dateFormat';

extend('date', function date(input, pattern) {
    return dateFormat(input, pattern);
});