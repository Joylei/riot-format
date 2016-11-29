import { getOption } from './opts'

/**
 * a decorator class to format value
 * @class
 */
export default class Formatter {
    constructor (value) {
        this._value = value
        //this._lazyValue = null
        //this[CHAINS_CALL] = null
    }

  /**
   * @description format the value to String
   * @returns {String}
   */
    toString () {
        let val = this.current
        if(val === null || typeof val === 'undefined'){
            return ''
        }
        return String(this.current)
    }

    /**
     * the original value passed in
     * 
     * @readonly
     * 
     * @memberOf Formatter
     */
    get value(){
        return this._value
    }

    /**
     * the evaluated value by chained formatters
     * 
     * @readonly
     * 
     * @memberOf Formatter
     */
    get current(){
        //check error
        if(this._error){
            console.error(this._error)
            return getOption('err')
        }

        if('_lazyValue' in this){
            return this._lazyValue
        }

        const chains = this._chains
        //no chains
        if(!chains){
            return this._value
        }

        delete this._chains
        delete this._lazyValue
        delete this._error

        //eval chains
        try {
            let val = this._value
            for(let i=0; i< chains.length; i++){
                val = chains[i](val)
            }
            this._lazyValue = val
            return val
        } catch (e) {
            this._error = e
            console.error(e)
        }
        return getOption('err')
    }

   /**
   * deprecated, use current
   * @deprecated
   */
    valueOf () {
        console.warn('deprecated, will be removed in future')
        return this.current
    }
}

