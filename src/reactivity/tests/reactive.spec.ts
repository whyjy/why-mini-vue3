/*
 * @Author: wuhongyi5
 * @Date: 2022-04-05 17:55:01
 * @LastEditors: wuhongyi5
 * @LastEditTime: 2022-04-23 23:35:46
 * @FilePath: /why-mini-vue3/src/reactivity/tests/reactive.spec.ts
 * @description: 
 */
import { isProxy, isReactive, reactive } from '../../reactivity/reactive';
describe('reactive', () => {
    it('happy path', () => {
        const original = { foo: 1 }
        //创建响应式对象
        const observed = reactive(original)
        // 验证obsered不等于original
        expect(observed).not.toBe(original)
        expect(observed.foo).toBe(1)
        expect(isReactive(observed)).toBe(true)
        expect(isReactive(original)).toBe(false)
        //检测是不是proxy
        expect(isProxy(observed)).toBe(true)

    })
    test('nest reactive', () => {
        const original = {
            nested: {
                foo: 1
            },
            array: [{ bar: 2 }],
        }
        const observed = reactive(original)
        expect(isReactive(observed.nested)).toBe(true)
        expect(isReactive(observed.array)).toBe(true)
        expect(isReactive(observed.array[0])).toBe(true)
    })

})