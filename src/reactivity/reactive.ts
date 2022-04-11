/*
 * @Author: wuhongyi5
 * @Date: 2022-04-06 07:27:58
 * @LastEditors: wuhongyi5
 * @LastEditTime: 2022-04-11 10:10:47
 * @FilePath: /why-mini-vue3/src/reactivity/reactive.ts
 * @description: 
 */
import { track, trigger } from "./effect"
//通过proxy做的代理拦截
export function reactive(raw) {
    return new Proxy(raw, {
        //target是对象，key是用户访问的key
        get(target, key) {
            const res = Reflect.get(target, key)
            //依赖收集
            track(target, key)
            return res
        },
        set(target, key, value) {
            const res = Reflect.set(target, key, value)
            //触发依赖
            trigger(target, key)
            return res
        }
    })
}