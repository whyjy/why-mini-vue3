/*
 * @Author: wuhongyi5
 * @Date: 2022-04-06 07:27:58
 * @LastEditors: wuhongyi5
 * @LastEditTime: 2022-04-18 10:52:33
 * @FilePath: /why-mini-vue3/src/reactivity/reactive.ts
 * @description: 
 */
import { mutableHandlers, readonlyHandlers } from "./baseHandlers"

//通过proxy做的代理拦截
export function reactive(raw) {
    return createActiveObject(raw, mutableHandlers)
}

export function readonly(raw) {
    return createActiveObject(raw, readonlyHandlers)
}
function createActiveObject(raw: any, baseHandlers) {
    return new Proxy(raw, baseHandlers)
}