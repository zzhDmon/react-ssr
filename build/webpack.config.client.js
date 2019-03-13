const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const HTMLPlugin = require('html-webpack-plugin')
// 是否开发环境
const isDev = process.env.NODE_ENV === 'development'

const config = webpackMerge(baseConfig,{
    entry: {
        app: path.join(__dirname, '../client/app.js')
    },
    output: {
        filename: '[name].[hash].js',
    },

    plugins: [
        // 生成html页面 并把entry文件注入
        new HTMLPlugin({
            template: path.join(__dirname, '../client/template.html')
        })
    ]
})

if (isDev) {
    config.entry = {
        app: [//模块热替换所需
            'react-hot-loader/patch',
            path.join(__dirname, '../client/app.js')
        ]
    }
    config.devServer = {
        host: '0.0.0.0',//localhost 127.0.0.1 或者 本机IP访问
        port: '8888',
        // 如果硬盘中有dist文件优先在硬盘中找（可能会出现js 404的问题）否则在内存终找
        contentBase: path.join(__dirname, '../dist'),//经过webpack编译出来的静态文件
        hot: true, //启动 Hot Module Replacement 配合babel插件
        overlay: {
            errors: true    //编译错误时 黑色弹窗
        },
        publicPath: '/public/', //对应output的publicpath
        historyApiFallback: {
            // 所有404的请求返回路由页面
            index: '/public/index.html'
        },
        proxy: {
          '/api': 'http://localhost:3333'
        }
    }
    config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = config
