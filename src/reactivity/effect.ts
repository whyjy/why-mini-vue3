/*
 * @Author: wuhongyi5
 * @Date: 2022-04-09 18:04:00
 * @LastEditors: wuhongyi5
 * @LastEditTime: 2022-04-11 10:13:35
 * @FilePath: /why-mini-vue3/src/reactivity/effect.ts
 * @description: 
 */
class ReactiveEffect {
    private _fn: any
    constructor(fn) {
        this._fn = fn
    }
    run() {
        activeEffect = this
        this._fn()
    }
}

//收集依赖，一个容器存放effect中的参数fn，并且不能重复
const targetMap = new Map()
export function track(target, key) {
    //target->key->dep
    let depsMap = targetMap.get(target)//获取target
    if (!depsMap) {
        depsMap = new Map()
        targetMap.set(target, depsMap)
    }
    let dep = depsMap.get(key)//获取key
    if (!dep) {
        dep = new Set()
        depsMap.set(key, dep)
    }
    dep.add(activeEffect)
}

export function trigger(target, key) {
    //基于target和key取出dep对象，然后遍历之前收集到的fn,然后调用
    let depsMap = targetMap.get(target)
    let dep = depsMap.get(key)
    for (const effect of dep) {
        effect.run()
    }
}
let activeEffect;
export function effect(fn) {
    const _effect = new ReactiveEffect(fn)
    _effect.run()
}