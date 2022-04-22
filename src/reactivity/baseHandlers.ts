/*
 * @Author: wuhongyi5
 * @Date: 2022-04-18 10:46:47
 * @LastEditors: wuhongyi5
 * @LastEditTime: 2022-04-22 11:01:19
 * @FilePath: /why-mini-vue3/src/reactivity/baseHandlers.ts
 * @description: 
 */

import { extend, isObject } from "../shared"
import { track, trigger } from "./effect"
import { reactive, ReactiveFlags, readonly } from "./reactive"

//缓存函数，避免每次都创建
const get = createGetter()
const set = createSetter()
const readonlyGet = createGetter(true)
const shallowReadonlyGet = createGetter(true, true)
//高阶函数
function createGetter(isReadonly = false, shallow = false) {
    return function get(target, key) {
        if (key === ReactiveFlags.IS_REACTIVE) {
            return !isReadonly
        } else if (key === ReactiveFlags.IS_READONLY) {
            return isReadonly
        }
        const res = Reflect.get(target, key)
        if (shallow) {
            return res
        }
        if (isObject(res)) {
            console.log(reactive(res))
            return isReadonly ? readonly(res) : reactive(res)
        }
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
        //不能设置，输出警告
        console.warn(`This ${key} is connot be set because ${target} is read-only`)
        return true
    }
}
//readonlyHandlers中的set和shallowReadonlyHandlers中的set是一样的，就用extent方法处理，这个操作真实绝
export const shallowReadonlyHandlers = extend({}, readonlyHandlers, {
    get: shallowReadonlyGet
})