/*
 * @Author: wuhongyi5
 * @Date: 2022-04-18 10:46:47
 * @LastEditors: wuhongyi5
 * @LastEditTime: 2022-04-18 11:03:52
 * @FilePath: /why-mini-vue3/src/reactivity/baseHandlers.ts
 * @description: 
 */

import { track, trigger } from "./effect"

//缓存函数，避免每次都创建
const get = createGetter()
const set = createSetter()
const readonlyGet = createGetter(true)
//高阶函数
function createGetter(isReadonly = false) {
    return function get(target, key) {
        const res = Reflect.get(target, key)
        //依赖收集
        if (!isReadonly) {
            track(target, key)
        }
        return res
    }
}

function createSetter() {
    return function set(target, key, value) {
        const res = Reflect.set(target, key, value)
        //触发依赖
        trigger(target, key)
        return res
    }
}

export const mutableHandlers = {
    get,
    set
}
export const readonlyHandlers = {
    get: readonlyGet,
    set(target, key, value) {
        //?TODO 输出警告
        console.warn(`This ${key} is connot be set because ${target} is read-only`)
        return true
    }
}