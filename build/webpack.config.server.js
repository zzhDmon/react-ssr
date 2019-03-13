const path = require('path')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base')

module.exports = webpackMerge(baseConfig, {
    target: 'node',
    mode: "development", // "production" | "development" | "none"
    entry: {
        app: path.join(__dirname, '../client/server-entry.js')
    },
    output: {
        filename: 'server-entry.js',
        // 使用最新模块加载方案
        libraryTarget: 'commonjs2'
    },
})
