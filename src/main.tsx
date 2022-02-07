// 引入 react 框架基础库
import React from 'react'
import ReactDOM from 'react-dom'
// 引入路由
import { BrowserRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
// 引入路由配置
import routes from './routes'
// 引入 react-redux
import { Provider } from 'react-redux'
// 引入 store
import store from './store'

import decode from 'jwt-decode'
// 获取 token 和 解析 token
import { loginStatus } from './pages/Login/Components/Login/store/actions'
const token = localStorage.getItem('@#@TOKEN')
if (token) store.dispatch(loginStatus(decode(token)))

// 引入 antd 全局样式
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'

// 全局样式
import './styles/global.scss'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
