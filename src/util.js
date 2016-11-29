export const slice = Array.prototype.slice

export function arrayify(obj){
    return slice.call(obj, 0)
}

export function isString(obj){
    return typeof obj === 'string'
}

export function isFunction(obj){
    return typeof obj === 'function'
}

export function isUndefined(obj){
    return typeof obj === 'undefined'
}

export function isNull(obj){
    return obj === null
}

export function isNullOrUndefined(obj){
    return isUndefined(obj) || isNull(obj)
}

export function inArray(arr, item){
    return arr.indexOf(item) !== -1
}

/**
 * throw error
 * 
 * @export
 * @param {string} msg
 * @returns {never}
 */
export function fail(msg){
    throw new Error(msg)
}

export const warn = console.warn.bind(console)

export const error = console.error.bind(console)