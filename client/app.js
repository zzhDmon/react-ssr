import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { AppContainer } from 'react-hot-loader' // eslint-disable-line
import App from './views/App'
import appState from './store/app-state'

// ReactDom.hydrate(<App/>,document.getElementById('root'))
const root = document.getElementById('root')
const render = (Component) => {
  const renderMethod = module.hot ? ReactDom.render : ReactDom.hydrate;
  // 注意点！
  // 如果不对是否采用react-hot-loader进行判断，npm run dev：client时，进入浏览器会弹出错误
  // Warning: Expected server HTML to contain a matching <div> in <div>.
  renderMethod(
    <AppContainer>
      <Provider appState={appState}>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    root,
  )
};

render(App)
if (module.hot) {
  module.hot.accept('./views/App.jsx', () => {
    const NextApp = require('./views/App.jsx').default // eslint-disable-line
    render(NextApp)
  })
}
