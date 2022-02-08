import * as React from 'react'
import { Component } from 'react'

// antd
import { message } from 'antd'

// jwt
import decode from 'jwt-decode'

// connect
import { connect } from 'react-redux'
// 导入 redux
import { bindActionCreators } from 'redux'
// 引入 action
import { login as loginActionCrator } from './store'

interface LoginProps {
  loginFn: any
  history: any
}

interface LoginState {}

class Login extends Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props)
  }
  state = {
    userInfo: {
      username: '',
      password: ''
    }
  }
  // 表单提交
  handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // 阻止默认行为
    e.preventDefault()

    // 获取表单数据
    const result = await this.props.loginFn.login(this.state.userInfo)
    // 判断是否登录成功
    if (result.status === 0) {
      return message.error(result.message)
    }
    if (result.status === 200) {
      // 获取 token
      const token = result.data.token
      // 本地持久化存储 token
      localStorage.setItem('@#@TOKEN', token)

      this.props.loginFn.loginStatus(decode(result.data.token))
      message.success(result.message)
      return this.props.history.push('/history')
    }
  }
  // onChange
  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      userInfo: {
        ...this.state.userInfo,
        [e.target.name]: e.target.value
      }
    })
  }
  render() {
    const { username, password } = this.state.userInfo
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <h2>登录</h2>
        {/* 用户登录 -- 用户名 */}
        <input
          type="username"
          name="username"
          placeholder="请输入用户名..."
          defaultValue={username}
          onChange={this.handleChange}
        />
        {/* 用户登录 -- 密码 */}
        <input
          type="password"
          name="password"
          placeholder="请输入密码..."
          defaultValue={password}
          onChange={this.handleChange}
        />
        <a href="#" className="forget-password">
          forget your password
        </a>
        <button type="submit" className="signIn">
          登录
        </button>
      </form>
    )
  }
}

// 将store中的数据映射到组件的props上
const mapStateToProps = (state: any) => {
  return {
    loginData: state.login
  }
}

// 将store中的方法映射到组件的props上
const mapDispatchToProps = (dispatch: any) => {
  return {
    loginFn: bindActionCreators(loginActionCrator, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
