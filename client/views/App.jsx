import React from 'react'
import Routes from '../config/router'
import AppBar from './layout/app-bar'

export default class App extends React.Component {
  componentDidMount() {
    // do
  }

  render() {
    return [
      // <div key="nav">
      //   <Link to="/">首页</Link>
      //   <Link to="/detail">详情</Link>
      // </div>,
      <AppBar />,
      <Routes key="cont" />,
    ]
  }
}
