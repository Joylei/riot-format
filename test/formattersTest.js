import expect from 'expect.js'
import date from '../src/formatters/date'
import json from '../src/formatters/json'
import number from '../src/formatters/number'
import bytes from '../src/formatters/bytes'
import '../src/formatters'
import Formatter from '../src/formatter'

describe('formatters', () => {
    describe('for each methods', () => {
        describe('#date()', () => {

            it('should be a function', () => {
                expect(date).to.be.a('function')
            })

            it('should format with defualt mask', () => {
                const time = new Date('2015-10-1 15:30:12')
                expect(date(time)).to.equal('Thu Oct 01 2015 15:30:12')
            })

            it('should format with given mask', () => {
                const time = new Date('2015-10-1 15:30:12')
                expect(date(time, 'yyyy-mm-dd')).to.equal('2015-10-01')
            })
        })

        describe('#json()', () => {
            it('should be a function', () => {
                expect(json).to.be.a('function')
            })

            it('should format when input is Object', () => {
                expect(json({
                    a: 1,
                    b: 'b'
                })).to.equal('{"a":1,"b":"b"}')
            })
        })

        describe('#number()', () => {
            it('should be a function', () => {
                expect(number).to.be.a('function')
            })

            it('should format with default fractionSize', () => {
                expect(number(10.0156)).to.equal('10.02')
            })

            it('should format when fractionSize=1', () => {
                expect(number(10.0156, 1)).to.equal('10.0')
            })

            it('should format for NAN', () => {
                expect(number('ttt')).to.equal('ttt')
            })

            it('should format for POSITIVE_INFINITY', () => {
                expect(number(Number.POSITIVE_INFINITY)).to.equal('∞')
            })

            it('should format for NEGATIVE_INFINITY', () => {
                expect(number(Number.NEGATIVE_INFINITY)).to.equal('-∞')
            })
        })

        describe('#bytes()', () => {
            it('should be a function', () => {
                expect(bytes).to.be.a('function')
            })

            it('should format for input below 1024', () => {
                const num = 100
                expect(bytes(num)).to.equal('100')
            })

            it('should format for input below 1024*1024', () => {
                const num = 1024 * 100
                expect(bytes(num)).to.equal('100.00K')
            })

            it('should format for input below 1024*1024*1024', () => {
                const num = 1024 * 1024 * 100
                expect(bytes(num)).to.equal('100.00M')
            })

            it('should format for input above 1024*1024*1024', () => {
                const num = 1024 * 1024 * 1024 * 100
                expect(bytes(num)).to.equal('100.00G')
            })
        })
    })

    describe('after extend', () => {
        const methods = ['date', 'bytes', 'number', 'json']
        for (let method of methods) {
            it(`should have method ${method}`, () => {
                expect(Formatter.prototype[method]).to.be.a('function')
            })
        }
    })
})