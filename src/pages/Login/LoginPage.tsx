import * as React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'

// 引入样式
import './scss/index.scss'
// 组件引入
import LoginForm from './Components/LoginForm/LoginForm'
import LoginEarth from './Components/LoginEartch/LoginEarth'
// 获取请求

// react-router-dom
import { Link } from 'react-router-dom'
// 获取图片

// 用于定义组件、请求等传来的数据类型
interface HomeProps {}

// 用于定义 state 中的数据类型
interface HomeState {}

class Home extends Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props)
    // 定义数据
    this.state = {}
  }

  /** 用于发起请求数据并获取数据 */
  componentDidMount() {}
  render() {
    return (
      <div id="homePage">
        {/* 用户路由跳转 */}
        {/* <Link to="/other">跳转到 Other 页面</Link> */}
        {/* 0. 标题部分 */}
        <div className="homeTitle">
          <h1>迦勒底历史观测所</h1>
        </div>
        {/* 地球仪 */}
        <LoginEarth></LoginEarth>
        {/* 1. 用户登录区域 -- 居中 */}
        <LoginForm {...this.props}></LoginForm>
      </div>
    )
  }
}

// 将 state 中的数据映射到组件的 props 上
const mapStateToProps = (state: any) => {
  return {}
}

// 将 action 映射到组件的 props 上
const mapDispatchToProps = (dispatch: any) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
