import * as React from 'react'
import { Component } from 'react'
import classNames from 'classnames'

// 导入 connect
import { connect } from 'react-redux'
// 导入 redux
import { bindActionCreators } from 'redux'
// 引入 action
import { register as registerActionCrator } from './store'

// antd
import { message } from 'antd'

interface RegisterProps {
  registerFn: any
  registerData: any
  history: any
}

interface RegisterState {}

class Register extends Component<RegisterProps, RegisterState> {
  constructor(props: RegisterProps) {
    super(props)
  }
  // 收集用户注册信息
  state = {
    userInfo: {
      username: '',
      password: '',
      email: ''
    },
    error: ''
  }
  // 提交用户注册信息
  handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // 阻止默认行为
    e.preventDefault()
    // 清空错误信息
    this.setState({
      error: []
    })
    // 获取用户注册信息
    const result = await this.props.registerFn.register(this.state.userInfo)
    console.log(result)
    if (result.code === 1) {
      return this.setState({
        error: result.data
      })
    }
    // 注册成功
    // console.log(this.props)
    // 跳转到主页页面
    this.props.history.push('/history')
    message.success('注册成功')
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
    return (
      <form onSubmit={this.handleSubmit} className="form">
        <h2>游客账号注册</h2>
        {/* 用户注册 -- 用户名 */}
        <div className="input">
          <input
            type="text"
            className={classNames({
              warning: this.state.error[0] === 'username'
            })}
            name="username"
            placeholder="请输入用户名..."
            defaultValue={this.state.userInfo.username}
            onChange={this.handleChange}
          />
          <small>{this.state.error[0] === 'username' ? this.state.error[1] : ''}</small>
        </div>
        {/* 用户注册 -- 邮箱 */}
        <div className="input">
          <input
            type="email"
            className={classNames({
              warning: this.state.error[0] === 'email'
            })}
            name="email"
            placeholder="请输入邮箱..."
            defaultValue={this.state.userInfo.email}
            onChange={this.handleChange}
          />
          <small>{this.state.error[0] === 'email' ? this.state.error[1] : ''}</small>
        </div>
        {/* 用户注册 -- 密码 */}
        <div className="input">
          <input
            type="password"
            className={classNames({
              warning: this.state.error[0] === 'password'
            })}
            name="password"
            placeholder="请输入密码..."
            defaultValue={this.state.userInfo.password}
            onChange={this.handleChange}
          />
          <small>{this.state.error[0] === 'password' ? this.state.error[1] : ''}</small>
        </div>

        <button type="submit" className="signUp">
          注册
        </button>
      </form>
    )
  }
}

// 创建 mapStateToProps 函数
const mapStateToProps = (state: any) => {
  return {
    registerData: state.register
  }
}

// 创建 mapDispatchToProps 函数
const mapDispatchToProps = (dispatch: any) => {
  return {
    registerFn: bindActionCreators(registerActionCrator, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
