import expect from 'expect.js'
import * as util from '../src/util'

describe('util.js',function(){
    describe('#arrayify()', function(){
        it('should return array', function(){
            let arr = { length: 1 }
            let result = util.arrayify(arr)
            expect(result).to.be.a(Array)
        })
    })


    describe('#isFunction()', function(){
        it('should return true for function', function(){
            expect(util.isFunction(()=>{})).to.be.ok()
        })

        it('should return false for undefined', function(){
            expect(util.isFunction(undefined)).to.not.be.ok()
        })
    })

    describe('#isUndefined()', function(){
        it('should return true for undefined', function(){
            expect(util.isUndefined(undefined)).to.be.ok()
        })

        it('should return false for non undefined', function(){
            expect(util.isUndefined('')).to.not.be.ok()
        })
    })

    describe('#isString()', function(){
        it('should return true for string', function(){
            expect(util.isString('')).to.be.ok()
        })

        it('should return false for non string', function(){
            expect(util.isString(null)).to.not.be.ok()
        })
    })

    describe('#isNull()', function(){
        it('should return true for null', function(){
            expect(util.isNull(null)).to.be.ok()
        })

        it('should return false for non null', function () {
            expect(util.isNull(0)).to.not.be.ok()
        })
    })
})