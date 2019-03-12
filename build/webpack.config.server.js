const path = require('path')

module.exports = {
    target: 'node',
    mode: "development", // "production" | "development" | "none"
    entry: {
        app: path.join(__dirname, '../client/server-entry.js')
    },
    output: {
        filename: 'server-entry.js',
        path: path.join(__dirname, '../dist'),
        publicPath: '/public',
        // 使用最新模块加载方案
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /.jsx$/,
                loader: 'babel-loader',
            },
            {
                test: /.js$/,
                loader: 'babel-loader',
                exclude: [
                    path.join(__dirname, '../node_modules')
                ]
            }
        ]
    },
}