/*
 * @Author: wuhongyi5
 * @Date: 2022-04-02 10:40:28
 * @LastEditors: wuhongyi5
 * @LastEditTime: 2022-04-11 10:17:20
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
})