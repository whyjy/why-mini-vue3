/*
 * @Author: wuhongyi5
 * @Date: 2022-04-05 17:55:01
 * @LastEditors: wuhongyi5
 * @LastEditTime: 2022-04-09 17:59:58
 * @FilePath: /why-mini-vue3/src/reactivity/tests/reactive.spec.ts
 * @description: 
 */
import { reactive } from '../../reactivity/reactive';
describe('reactive', () => {
    it('happy path', () => {
        const original = { foo: 1 }
        //创建响应式对象
        const observed = reactive(original)
        // 验证obsered不等于original
        expect(observed).not.toBe(original)
        expect(observed.foo).toBe(1)

    })
})