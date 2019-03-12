const express = require('express')
const ReactSSR = require('react-dom/server')
const fs = require('fs')
const path = require('path')


const isDev = process.env.NODE_ENV === 'development'


const app = express()


if(!isDev){
    // webpack  libraryTarget: 'commonjs2' 
    // serverEntry的default属性才是需要内容
    const serverEntry = require('../dist/server-entry').default
    const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'),'utf8')
    // 定义静态文件 返回的路径 配合webpack的publicPath配置
    app.use('/public', express.static(path.join(__dirname, '../dist')))
    app.get('*', function(req, res){
        const appString = ReactSSR.renderToString(serverEntry)
        // template.replace('<app></app>',appString)
        res.send(template.replace('<!-- app -->',appString))
    })
}else{
    const devStatic = require('./util/dev-static')
    devStatic(app)
}

app.listen(3333, function(){
    console.log('server is  listening')
})