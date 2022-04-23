/*
 * @Author: wuhongyi
 * @Date: 2022-04-18 09:36:53
 * @LastEditors: wuhongyi5
 * @LastEditTime: 2022-04-23 23:36:11
 * @FilePath: /why-mini-vue3/src/reactivity/tests/readonly.spec.ts
 * @description: 
 */

import { isReadonly, readonly, isProxy } from "../reactive"

describe('readonly', () => {
    it('happy path', () => {
        //readonly和readonly的区别：readonly不可以被改写,只能读，就不会触发依赖，也就不用收集依赖
        const original = { foo: 1, bar: { baz: 2 } }
        const wrapped = readonly(original)
        expect(wrapped).not.toBe(original)
        expect(wrapped.foo).toBe(1)
        expect(isReadonly(wrapped)).toBe(true)
        expect(isReadonly(original)).toBe(false)
        //测试嵌套对象是否转换成功
        expect(isReadonly(wrapped.bar)).toBe(true)
        expect(isReadonly(original.bar)).toBe(false)
        //检测是不是proxy
        expect(isProxy(wrapped)).toBe(true)
    })
    it('warn then call set', () => {
        console.warn = jest.fn()
        const user = readonly({ age: 18 })
        user.age = 19
        expect(console.warn).toBeCalled()
    })
})