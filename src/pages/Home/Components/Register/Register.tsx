import * as React from 'react'
import { Component } from 'react'

interface RegisterProps {}

interface RegisterState {}

class Register extends Component<RegisterProps, RegisterState> {
  constructor(props: RegisterProps) {
    super(props)
  }
  // 收集用户注册信息
  state = {
    username: '',
    password: '',
    email: ''
  }
  // 提交用户注册信息
  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // 阻止默认行为
    e.preventDefault()
    console.log(this.state)
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
          name="username"
          id="username"
          placeholder="Username..."
          defaultValue={this.state.username}
          onChange={this.handleChange}
        />
        {/* 用户注册 -- 邮箱 */}
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email..."
          defaultValue={this.state.password}
          onChange={this.handleChange}
        />
        {/* 用户注册 -- 密码 */}
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password..."
          defaultValue={this.state.email}
          onChange={this.handleChange}
        />
        <button type="submit" className="signUp">
          sign up
        </button>
      </form>
    )
  }
}

export default Register
