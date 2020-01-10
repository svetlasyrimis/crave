import React from 'react';
import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'


export default function Login(props) {
  return (
    <>
      {
        props.currentView === 'register' && (
          <>
            <div className="register-page">
              <RegisterForm
                registerForm={props.registerFormData}
                handleSubmit={props.handleRegisterSubmit}
                handleChange={props.handleRegisterFormChange}
              />
              <div className="button">
                <button onClick={props.toggleAuthView}>Login</button>
              </div>
            </div>
          </>
        )
      }


      {
        props.currentView === 'login' && (
          <>
            <div className="login-page">
              <LoginForm
                loginFormData={props.loginFormData}
                handleSubmit={props.handleLoginSubmit}
                handleChange={props.handleLoginFormChange}
              />
              <div className="button">
                <button onClick={props.toggleAuthView}>Register</button>
              </div>
            </div>
          </>
        )
      }
    </>
  )
}