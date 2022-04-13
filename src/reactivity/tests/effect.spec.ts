/*
 * @Author: wuhongyi5
 * @Date: 2022-04-02 10:40:28
 * @LastEditors: wuhongyi5
 * @LastEditTime: 2022-04-13 23:12:44
 * @FilePath: /why-mini-vue3/src/reactivity/tests/effect.spec.ts
 * @description: 
 */
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
})