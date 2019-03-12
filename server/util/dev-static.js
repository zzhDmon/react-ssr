const axios = require('axios')
const webpack = require('webpack')
const path = require('path')
const MemoryFs = require('memory-fs')
const proxy = require('http-proxy-middleware')
const ReactDomServer = require('react-dom/server')

const serverConfig = require('../../build/webpack.config.server')

const getTemplate = () => {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:8888/public/index.html')
            .then(res => {
                resolve(res.data)
            })
            .catch(reject)
    })
}

const Module = module.constructor

const mfs = new MemoryFs
// 运行 监听服务端打包打包
const serverCompiler = webpack(serverConfig)
serverCompiler.outputFileSystem = mfs //内存读写
let serverBundle
serverCompiler.watch({}, (err,stats) => {
    if (err) throw err
    stats = stats.toJson()
    stats.errors.forEach(err => console.error(err))
    stats.warnings.forEach(warn => console.error(warn))

    const bundlePath = path.join(
        serverConfig.output.path,
        serverConfig.output.filename
    )

    const bundle = mfs.readFileSync(bundlePath,'utf-8') //读出 string 内容
    const m = new Module() //生成module 用module读取内容
    m._compile(bundle,'server-entry.js') //指定在内存中的文件名
    serverBundle = m.exports.default
})

module.exports = function (app) {
    // app.use('/public', express.static(path.join(__dirname, '../dist')))
    app.use('./public',proxy({
        target: 'http://localhost:8888'
    }))
    app.get('*', function(req, res) {
        getTemplate().then(template => {
            const content = ReactDomServer.renderToString(serverBundle)
            res.send(template.replace('<!-- app -->',content))
        })
    })

}