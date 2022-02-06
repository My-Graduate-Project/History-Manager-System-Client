import * as React from 'react'
import { Component } from 'react'

// 导入 connect
import { connect } from 'react-redux'
// 导入 redux
import { bindActionCreators } from 'redux'
// 引入 action
import { register as registerActionCrator } from './store'

interface RegisterProps {
  registerFn: any
  registerData: any
}

interface RegisterState {}

class Register extends Component<RegisterProps, RegisterState> {
  constructor(props: RegisterProps) {
    super(props)
  }
  // 收集用户注册信息
  state = {
    usernameRegister: '',
    passwordReister: '',
    emailRegister: ''
  }
  // 提交用户注册信息
  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // 阻止默认行为
    e.preventDefault()
    console.log(this.state)
    this.props.registerFn.register(this.state)
  }
  // onChange
  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit} className="form">
        <h2>sign up</h2>
        {/* 用户注册 -- 用户名 */}
        <input
          type="text"
          name="usernameRegister"
          id="usernameRegister"
          placeholder="UsernameRegister..."
          defaultValue={this.state.usernameRegister}
          onChange={this.handleChange}
        />
        {/* 用户注册 -- 邮箱 */}
        <input
          type="email"
          name="emailRegister"
          id="emailRegister"
          placeholder="EmailRegister..."
          defaultValue={this.state.emailRegister}
          onChange={this.handleChange}
        />
        {/* 用户注册 -- 密码 */}
        <input
          type="password"
          name="passwordReister"
          id="passwordReister"
          placeholder="PasswordResiter..."
          defaultValue={this.state.passwordReister}
          onChange={this.handleChange}
        />
        <button type="submit" className="signUp">
          sign up
        </button>
      </form>
    )
  }
}

// 创建 mapStateToProps 函数
const mapStateToProps = (state: any) => {
  console.log(state)
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
