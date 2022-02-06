import * as React from 'react'
import { Component, createRef } from 'react'

import './scss/index.scss'

// 组件引入
import Resiter from '../Register/Register'
import Login from '../Login/Login'

interface LoginFormProps {}

interface LoginFormState {}

const container = createRef<HTMLDivElement>()

class LoginForm extends Component<LoginFormProps, LoginFormState> {
  constructor(props: LoginFormProps) {
    super(props)
    console.log(this.props)
  }
  signUp = () => {
    container.current?.classList.add('active')
  }
  signIn = () => {
    container.current?.classList.remove('active')
  }

  render() {
    return (
      <React.Fragment>
        <div className="container" ref={container}>
          {/* <!-- register 注册页 --> */}
          <div className="form-container sign-up-container">
            {/* 用户注册组件 */}
            <Resiter {...this.props}></Resiter>
          </div>
          {/* <!-- login 登录页 --> */}
          <div className="form-container sign-in-container">
            {/* 登录组件 */}
            <Login></Login>
          </div>
          {/* <!-- overlay container 左右切换 --> */}
          <div className="overlay_container">
            <div className="overlay">
              {/* <!-- overlay left --> */}
              <div className="overlay_panel overlay_left_container">
                <h2>welcome back!</h2>
                <p>To keep connected with us please login with your personal info</p>
                <button id="sign-in" onClick={() => this.signIn()}>
                  sign in
                </button>
              </div>
              {/* <!-- overlay right --> */}
              <div className="overlay_panel overlay_right_container">
                <h2>hello friend!</h2>
                <p>Enter your personal details and start journey with us</p>
                <button id="sign-up" onClick={() => this.signUp()}>
                  sign up
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default LoginForm
