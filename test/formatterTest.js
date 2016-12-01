import expect from 'expect.js'

import Formatter from '../src/formatter'
import { extend, format } from '../src/format'
import opts, { DEFAULT_ERROR } from '../src/opts'

describe('Formatter',function(){
    describe('normal',function(){
        extend('test', function(input){
            let val = input + 1
            return val
        })

        let formatter = format(1)
        it('#formatter.value shoudld be 1', function(){
            expect(formatter.value).to.be.equal(1)
        })

        it('#formatter.current should not be evaluated before called current', function(){
            expect(formatter._lazyValue).to.be.a('undefined')
        })

        const times = 5
        before(function(){
            let self = formatter
            for(let i=0; i< times; i++) {
                self = self.test()
            }
        })
        it('#chained calls should work', function(){
            expect(formatter.current).to.be.equal(formatter.value + times)
        })

        it('#previous evaluated value should be persisted',function(){
            let self = format(1)
            self.test()
            let first = self.current
            self.test()
            let second = self.current
            expect(second).to.be.equal(first + 1)
        })
    })

    describe('when error', function(){
        before(function(){
            extend('test', function(input){
                throw new Error(input)
            })
        })

        describe('with defaults', function(){
            it(`toString() should be ${DEFAULT_ERROR}`, function(){
                let result = format(1, 'test').toString()
                expect(result).to.be.equal(DEFAULT_ERROR)
            })
        })

        describe('with opts.errorText=ERROR', function(){
            before(function(){
                opts.errorText='ERROR'
            })
            it('toString() should be ERROR', function(){
                let result = format(1, 'test').toString()
                expect(result).to.be.equal('ERROR')
            })
        })
    })

    after(function(){
        opts.errorText = DEFAULT_ERROR
        delete Formatter.prototype['test']
    })
})