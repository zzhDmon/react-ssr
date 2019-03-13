const express = require('express')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const session = require('express-session')
const ReactSSR = require('react-dom/server')
const fs = require('fs')
const path = require('path')


const isDev = process.env.NODE_ENV === 'development'


const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use(session({
  maxAge: 10 * 60 * 1000,
  name: 'tid',
  resave: false, //每次请求重新申请cookie
  saveUninitialized: false,
  secret: 'react cnode class' //加密
}))

app.use(favicon(path.join(__dirname, '../favicon.ico')))

app.use('/api/user', require('./util/handle-login'))
// app.use('/api', require('./util/proxy'))

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
