import { isReadonly, shallowReadonly } from "../reactive"

/*
 * @Author: wuhongyi5
 * @Date: 2022-04-22 09:49:43
 * @LastEditors: wuhongyi5
 * @LastEditTime: 2022-04-22 10:59:10
 * @FilePath: /why-mini-vue3/src/reactivity/tests/shallowReadonly.spec.ts
 * @description: 
 */
//shallowReadonly 对象的第一层是readonly属性，第二层之后就是普通属性（非响应式的）
//作为程序优化的形式存在，避免程序中将不必要的内嵌属性也作为响应式方式存在
describe('shallowReadonly', () => {
    test('should not make non-reactive properties reactive', () => {
        const props = shallowReadonly({ n: { foo: 1 } })
        expect(isReadonly(props)).toBe(true)
        expect(isReadonly(props.n)).toBe(false)
    })
    //测试shaollowReadonly只能get不能set
    it('should not make non-reactive properties reactive', () => {
        console.warn = jest.fn()
        const user = shallowReadonly({
            age: 10
        })
        user.age = 11
        expect(console.warn).toHaveBeenCalled()
    })
})