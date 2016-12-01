export const DEFAULT_ERROR = '!ERR!'

export default {
    /**
     * 0 - log error in console
     * 1 - throw error
     * 2 - sliently swallow
     */
    errorBehavior: 0,
    /**
     * represents that error occurs when evaluted formatters
     */ 
    errorText: DEFAULT_ERROR
}