declare interface Formatter {
    /**
     * retrieve formatter function by name
     */
    [formatterName: string]: (...args) => this;

    /**
     * built-in format method:
     * convert the current value to date and apply
     * 
     * @param {string} [formatMask] default is 'default'
     * @param {boolean} [utc] default is false
     * @returns {this}
     * 
     * @memberOf Formatter
     */
    date(formatMask?: string, utc?: boolean): this;

    /**
     * built-in format method:
     * convert current value to number
     * 
     * @param {Number} [fractionSize] default  = 2
     * @returns {this}
     * 
     * @memberOf Formatter
     */
    number(fractionSize?: Number): this;

    /**
     * built-in format method:
     * format number in K,M,G
     * eg 1024 * 100 to 100K
     * 
     * @returns {this}
     * 
     * @memberOf Formatter
     */
    bytes(fractionSize?: Number): this;

    /**
     * built-in format method:
     * convert current value to json string
     * 
     * @memberOf Formatter
     */
    json(): this;

    /**
     * the original value passed in
     * 
     * @type {any}
     * @memberOf Formatter
     */
    value: any;

    /**
     * current evaluated value of the formatter
     * 
     * @returns {any}
     * 
     * @memberOf Formatter
     */
    current: any;

    /**
     * convert the current evaluated value to string
     * 
     * @memberOf Formatter
     */
    toString();
}

/**
 * mixin riot-format, so you can use it globally in riot
 * 
 * usage:
 * import riot from 'riot';
 * import format from 'riot-format';
 * format(riot);
 * //then you can use it in riot 
 * @param {Object} riot riot module object
 */
declare function use(riot: any): void;

declare namespace use {
    /**
     * deprecated; use extend() instead; will remove in future
     * @deprecated
     */
    export var define: typeof extend;

    export function extend(formatters: { [name: string]: (input, ...args) => any }): void;

    export function extend(formatterName: string, formatterDefinition: (input, ...args) => any): void;

    export function format(input: any, formatterName?: string, ...addtionalArgs): Formatter;

    namespace format{
        /**
         * options
         */
        export var opts: {
            /**
             * 0 - log error in console;
             * 1 - throw error;
             * 2 - sliently swallow;
             */
            errorBehavior: 0,
            /**
             * represents that error occurs when evaluted formatters
             */ 
            errorText: '!ERR!'
        }
    }
}

declare module 'riot-format'{
    
    export default use;

    export var format: typeof use.format;

    export var extend: typeof use.extend;
}
