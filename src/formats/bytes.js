import {
    extend
} from '../formatter';

extend('bytes', function bytes(input, fractionSize = 2, defaultValue = '--') {
    const num = new Number(input);
    
    if (isNaN(num.valueOf()) || num < 0) {
        return defaultValue;
    }
    if (fractionSize < 0) {
        fractionSize = 2;
    }

    if (num < 1024) {
        return num.toFixed(0) + '';
    }
    if (num < 1024 * 1024) {
        return (num / 1024).toFixed(fractionSize) + 'K';
    }
    if (num < 1024 * 1024 * 1024) {
        return (num / (1024 * 1024)).toFixed(fractionSize) + 'M';
    }
    return (num / (1024 * 1024 * 1024)).toFixed(fractionSize) + 'G';
});