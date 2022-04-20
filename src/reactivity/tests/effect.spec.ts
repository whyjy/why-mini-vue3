/*
 * @Author: wuhongyi5
 * @Date: 2022-04-02 10:40:28
 * @LastEditors: wuhongyi5
 * @LastEditTime: 2022-04-20 21:40:24
 * @FilePath: /why-mini-vue3/src/reactivity/tests/effect.spec.ts
 * @description: 
 */

import { reactive } from '../../reactivity/reactive'
import { effect, stop } from '../../reactivity/effect'
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

    it('stop', () => {
        let dummy
        const obj = reactive({ prop: 1 })
        const runner = effect(() => {
            dummy = obj.prop
        })
        obj.prop = 2
        expect(dummy).toBe(2)
        stop(runner)
        // obj.prop = 3
        obj.prop++
        expect(dummy).toBe(2)

        runner()
        expect(dummy).toBe(3)
    })

    //stop的回调函数
    it('onStop', () => {
        const obj = reactive({ foo: 1 })
        const onStop = jest.fn()
        let dummy
        const runner = effect(
            () => {
                dummy = obj.foo
            },
            {
                onStop
            }
        )
        stop(runner)
        expect(onStop).toBeCalledTimes(1)
    })
})
