import expect from 'expect.js'

import Formatter from '../src/formatter'
import { extend, format } from '../src/format'
import opts from '../src/opts'

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

        it('#formatter.current should be not available before called current', function(){
            expect(formatter._lazyValue).to.be.a('undefined')
        })

        const times = 5
        for(let i=0; i< times; i++) {
            formatter.test()
        }

        let result = formatter.value + times
        it('#formatter.current should be ' + result, function(){
            expect(formatter.current).to.be.equal(result)
        })
    })

    extend('test', function(input){
        throw new Error()
    })

    describe('when error', function(){
        describe('with defaults', function(){
            it('toString() should be !ERR!', function(){
                let result = format(1, 'test').toString()
                expect(result).to.be.equal('!ERR!')
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
        opts.errorText = '!ERR!'
        delete Formatter.prototype['test']
    })
})