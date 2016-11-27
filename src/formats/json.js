import {
    extend
} from '../formatter';

extend('json', function json(input) {
    return JSON.stringify(input);
});