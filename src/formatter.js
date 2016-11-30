import opts from './opts'
import { isNullOrUndefined, error } from './util'

function handleError(e){
    if(opts.errorBehavior === 2){
        return
    }else if(opts.errorBehavior === 1){
        throw e
    }else{
        error(e)
    }
}

/**
 * a decorator class to format value
 * @class
 */
export default class Formatter {
    constructor (value) {
        this._value = value
    }

  /**
   * @description format the value to String
   * @returns {String}
   */
    toString () {
        let val = this.current
        return isNullOrUndefined(val) ? '' : String(val)
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
            handleError(this._error)
            return opts.errorText
        }

        const chains = this._chains
        let val =  '_lazyValue' in this ? this._lazyValue : this._value
        //no chains
        if(!chains){
            return val
        }

        delete this._chains
        delete this._lazyValue
        delete this._error

        //eval chains
        try {
            for(let i=0; i< chains.length; i++){
                val = chains[i](val)
            }
            this._lazyValue = val
            return val
        } catch (e) {
            this._error = e
            handleError(e)
        }
        return opts.errorText
    }
}

