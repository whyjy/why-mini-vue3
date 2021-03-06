/*
 * @Author: wuhongyi5
 * @Date: 2022-04-06 07:27:58
 * @LastEditors: wuhongyi5
 * @LastEditTime: 2022-04-23 23:34:42
 * @FilePath: /why-mini-vue3/src/reactivity/reactive.ts
 * @description: 
 */
import { mutableHandlers, readonlyHandlers, shallowReadonlyHandlers } from "./baseHandlers"

export const enum ReactiveFlags {
    IS_REACTIVE = "__v_isReactive",
    IS_READONLY = '__v_isReadonly'
}
//通过proxy做的代理拦截
export function reactive(raw) {
    return createActiveObject(raw, mutableHandlers)
}

export function readonly(raw) {
    return createActiveObject(raw, readonlyHandlers)
}
export function shallowReadonly(raw) {
    return createActiveObject(raw, shallowReadonlyHandlers)
}
export function isReactive(value) {
    return !!value[ReactiveFlags.IS_REACTIVE]
}
export function isReadonly(value) {
    return !!value[ReactiveFlags.IS_READONLY]
}
export function isProxy(value) {
    return isReactive(value) || isReadonly(value)
}
function createActiveObject(raw: any, baseHandlers) {
    return new Proxy(raw, baseHandlers)
}