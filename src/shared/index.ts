/*
 * @Author: wuhongyi5
 * @Date: 2022-04-17 18:21:17
 * @LastEditors: wuhongyi5
 * @LastEditTime: 2022-04-21 09:39:21
 * @FilePath: /why-mini-vue3/src/shared/index.ts
 * @description: 
 */
export const extend = Object.assign

export const isObject = (val) => {
    return val !== null && typeof val === 'object'
}