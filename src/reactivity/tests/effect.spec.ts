
import { reactive } from '../../reactivity/reactive'
import { effect } from '../../reactivity/effect'
describe('effect', () => {

    it('happy path', () => {
        const user = reactive({
            age: 10
        });
        let nextAge
        effect(() => {
            nextAge = user.age + 1
        })
        expect(nextAge).toBe(11)

        //update
        user.age++
        expect(nextAge).toBe(12)
    })

    it('should return runner when call effect', () => {
        //调用effect返回一个----》function-----》这个函数会执行传给effect的fn------>调用fn时返回fn内部返回的值
        let foo = 10
        const runner = effect(() => {
            foo++;
            return "foo"
        })
        expect(foo).toBe(11)
        const r = runner()
        expect(foo).toBe(12)
        expect(r).toBe('foo')
    })

    it('scheduler', () => {
        //1、通过effect的第二个参数给定scheduler的fn
        //2、当effect第一次执行的时候执行fn
        //3、当响应式对象set update时不会执行fn而是执行scheduler
        //4、如果当执行runner的时候，会再次执行fn
        //?TODO 为什么响应对象更新时要执行scheduler呢
        let dummy;
        let run: any
        const scheduler = jest.fn(() => {
            run = runner
        })
        const obj = reactive({ foo: 1 })
        const runner = effect(
            () => {
                dummy = obj.foo
            },
            {
                scheduler
            }
        )
        expect(scheduler).not.toHaveBeenCalled()
        expect(dummy).toBe(1)
        obj.foo++
        expect(scheduler).toHaveBeenCalledTimes(1);
        expect(dummy).toBe(1)
        run()
        expect(dummy).toBe(2)
    })
})
