const DEFAULT_ERROR = '!ERR!'

const opts = {
    /**
     * represents that error occurs when evaluted formatters
     */ 
    err: DEFAULT_ERROR
}

export default opts

export function getOption(key){
    let val = opts[key]
    if(key == 'err' && (typeof val === 'undefined' || val == null)){
        return DEFAULT_ERROR
    }
    return val
}