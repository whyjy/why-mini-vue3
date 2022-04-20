/*
 * @Author: wuhongyi5
 * @Date: 2022-04-09 18:04:00
 * @LastEditors: wuhongyi5
 * @LastEditTime: 2022-04-20 22:07:32
 * @FilePath: /why-mini-vue3/src/reactivity/effect.ts
 * @description: 
 */

import { extend } from "../shared"
let activeEffect;
let shouldTrack;
class ReactiveEffect {
    private _fn: any
    deps = []
    active = true
    onStop?: () => void//可有可无
    constructor(fn, public scheduler?) {
        this._fn = fn
    }
    run() {
        //1、执行run应该是触发依赖吧，？？
        if (!this.active) {
            return this._fn()
        }
        shouldTrack = true
        activeEffect = this
        let result = this._fn()
        //重置shouldTrack值
        shouldTrack = false
        return result
    }
    stop() {
        if (this.active) {
            cleanupEffect(this)
            if (this.onStop) {
                this.onStop()
            }
            this.active = false
        }
    }
}

function cleanupEffect(effect) {
    effect.deps.forEach((dep: any) => {
        dep.delete(effect)
    });
}
//get时收集依赖，一个容器存放effect中的参数fn，并且不能重复
const targetMap = new Map()
export function track(target, key) {
    if (!isTracking()) return
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
    //优化：如果dep中已经有activeEffect就不用收集了
    // dep.add(activeEffect)
    if (dep.has(activeEffect)) return
    dep.add(activeEffect)
    activeEffect.deps.push(dep)
}

function isTracking() {
    return shouldTrack && activeEffect !== undefined
}

//set时触发依赖
export function trigger(target, key) {
    //基于target和key取出dep对象，然后遍历之前收集到的fn,然后调用
    let depsMap = targetMap.get(target)
    let dep = depsMap.get(key)
    for (const effect of dep) {
        if (effect.scheduler) {
            effect.scheduler()
        } else {
            //这里run执行的是测试中effect的第一个参数，也就是对key的操作
            effect.run()
        }
    }
}

export function effect(fn, options: any = {}) {
    const _effect = new ReactiveEffect(fn, options.scheduler)
    extend(_effect, options)
    _effect.run()
    const runner: any = _effect.run.bind(_effect)
    runner.effect = _effect
    return runner
}

export function stop(runner) {//这里的runner是上面effect函数返回的runner
    runner.effect.stop()
}
