/*
 * @Author: wuhongyi5
 * @Date: 2022-03-31 10:39:07
 * @LastEditors: wuhongyi5
 * @LastEditTime: 2022-04-01 10:43:42
 * @FilePath: /vue3/WHY-MINI-VUE/src/reactivity/tests/index.spec.ts
 * @description: 监测测试环境搭建是否有问题
 * jest默认的环境是node.js环境，使用的是commonjs规范，但当引入ES模块时就要进行转换
 */

import { add } from '../index'
// 检测环境是否配好
it('init', () => {
    expect(add(1, 1)).toBe(2)
})

