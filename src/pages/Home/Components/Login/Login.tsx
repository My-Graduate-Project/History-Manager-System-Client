import * as React from 'react'
import { Component } from 'react'

interface LoginProps {}

interface LoginState {}

class Login extends Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props)
  }
  state = {
    usernameState: '',
    passwordState: ''
  }
  render() {
    return (
      <form className="form">
        <h2>sign in</h2>
        {/* 用户登录 -- 用户名 */}
        <input
          type="username"
          name="username"
          id="username"
          placeholder="Username..."
          defaultValue={this.state.usernameState}
        />
        {/* 用户登录 -- 密码 */}
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password..."
          defaultValue={this.state.passwordState}
        />
        <a href="#" className="forget-password">
          forget your password
        </a>
        <button className="signIn">sign in</button>
      </form>
    )
  }
}

export default Login
