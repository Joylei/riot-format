import expect from 'expect.js'
import {format, extend} from '../src/format'
import Formatter from '../src/formatter'

describe('format.js',function(){

    describe('#format()', function(){
        it('should be a function', function(){
            expect(format).to.be.a('function')
        })

        it('should format with date', function(){
            const time = new Date('2015-10-1 15:30:12')
            expect(format(time, 'date', 'yyyy-mm-dd').toString()).to.equal('2015-10-01')
        })
    })

    describe('#extend()',function(){
        it('should be a function', function(){
            expect(extend).to.be.a('function')
        })

        describe('when extend yesno', function(){
            extend('yesno', function(input){
                return input ? 'yes' : 'no'
            })

            it('should has yesno method on Formatter', function(){
                expect(Formatter.prototype['yesno']).to.be.a('function')
            })

            it('should display yes for 1', function(){
                expect(format(1, 'yesno').toString()).to.equal('yes')
            })

            it('should display no for 0', function(){
                expect(format(0, 'yesno').toString()).to.equal('no')
            })
        })

        describe('when extend multiple: yes and no', function(){
            extend({
                yes(input){
                    return input ? 'yes' : ''
                },
                no(input){
                    return !input ? 'no' : ''
                }
            })

            it('should has "yes" on Formatter',function(){
                expect(Formatter.prototype['yes']).to.be.a('function')
            })

            it('should has "no" on Formatter',function(){
                expect(Formatter.prototype['no']).to.be.a('function')
            })

            it('display yes for yes and 1', function(){
                expect(format(1, 'yes').toString()).to.equal('yes')
            })

            it('should display empty for yes and 0', function(){
                expect(format(0, 'yes').toString()).to.equal('')
            })

            it('should display no for no and 0', function(){
                expect(format(0, 'no').toString()).to.equal('no')
            })

            it('should display empty for no and 1', function(){
                expect(format(1, 'no').toString()).to.equal('')
            })
        })

        after(function(){
            delete Formatter.prototype['yesno']
            delete Formatter.prototype['yes']
            delete Formatter.prototype['no']
        })

    })
})