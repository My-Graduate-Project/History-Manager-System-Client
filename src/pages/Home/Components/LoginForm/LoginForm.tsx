import * as React from 'react'
import { useRef } from 'react'
import './scss/index.scss'

function LoginForm() {
  const container = useRef<HTMLDivElement>(null)
  console.log(container)
  const signUp = () => {
    container.current?.classList.add('active')
  }
  const signIn = () => {
    container.current?.classList.remove('active')
  }
  return (
    <React.Fragment>
      <div className="container" ref={container}>
        {/* <!-- register 注册页 --> */}
        <div className="form-container sign-up-container">
          <div className="form">
            <h2>sign up</h2>
            <input type="text" name="username" id="username" placeholder="Username..." />
            <input type="email" name="emal" id="email" placeholder="Email..." />
            <input type="password" name="password" id="password" placeholder="Password..." />
            <button className="signUp">sign up</button>
          </div>
        </div>
        {/* <!-- login 登录页 --> */}
        <div className="form-container sign-in-container">
          <div className="form">
            <h2>sign in</h2>
            <input type="email" name="emal" id="email" placeholder="Email..." />
            <input type="password" name="password" id="password" placeholder="Password..." />
            <a href="#" className="forget-password">
              forget your password
            </a>
            <button className="signIn">sign in</button>
          </div>
        </div>
        {/* <!-- overlay container 左右切换 --> */}
        <div className="overlay_container">
          <div className="overlay">
            {/* <!-- overlay left --> */}
            <div className="overlay_panel overlay_left_container">
              <h2>welcome back!</h2>
              <p>To keep connected with us please login with your personal info</p>
              <button id="sign-in" onClick={() => signIn()}>
                sign in
              </button>
            </div>
            {/* <!-- overlay right --> */}
            <div className="overlay_panel overlay_right_container">
              <h2>hello friend!</h2>
              <p>Enter your personal details and start journey with us</p>
              <button id="sign-up" onClick={() => signUp()}>
                sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default LoginForm
