/*
 * @Author: wuhongyi5
 * @Date: 2022-04-01 10:39:53
 * @LastEditors: wuhongyi5
 * @LastEditTime: 2022-04-01 10:42:52
 * @FilePath: /vue3/WHY-MINI-VUE/babel.config.js
 * @description: 
 */
module.exports = {
    presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        '@babel/preset-typescript'
    ],
};