import React from 'react'
import ReactDom from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './App.jsx'

// ReactDom.hydrate(<App/>,document.getElementById('root'))
const root = document.getElementById('root')
// const render = Component => {
//     ReactDom.hydrate(
//         <AppContainer>
//             <Component/>
//         </AppContainer>,
//         root
//     )
// }
const render = Component => {
    const renderMethod=module.hot ? ReactDom.render : ReactDom.hydrate;
    //注意点！
    //如果不对是否采用react-hot-loader进行判断，npm run dev：client时，进入浏览器会弹出错误
    //Warning: Expected server HTML to contain a matching <div> in <div>.
    renderMethod(
        <AppContainer>
            <Component />
        </AppContainer>,
            root
    )
    
};

render(App)

if (module.hot) {
    module.hot.accept('./App.jsx', () => {
        const NextApp = require('./App.jsx').default
        render(NextApp)
    })
}