import expect from 'expect.js'
import use, {format, extend} from '../src/index'

describe('index.js', function(){
    describe('#use', function () { 
        it('should be a function', function(){
            expect(use).to.be.a('function')
        })

        let mixinCalled = false
        const riot = {
            mixin(){
                mixinCalled = true
            }
        }

        it('should mixin after called', function(){
            use(riot)
            expect(mixinCalled).to.ok()
        })

        for(let method of ['define', 'extend', 'format']){
            it(`should has method ${method}`, function(){
                expect(use[method]).to.be.a('function')
            })
        }
    })

    it('#format() should be a function', function () {
        expect(format).to.be.a('function')
    })

    it('#extend() should be a function', function () {
        expect(extend).to.be.a('function')
    })
})