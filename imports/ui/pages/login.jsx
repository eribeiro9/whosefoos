import React from 'react'
import { Meteor } from 'meteor/meteor'
import { FlowRouter } from 'meteor/kadira:flow-router'

login = (e) => {
  e.preventDefault()

  let user = e.target.user.value
  let password = e.target.password.value

  Meteor.loginWithPassword(user, password, (err) => {
    if (!err) {
      FlowRouter.go('home')
    } else {
      console.error(err)
    }
  })
}

const Login = () => (
  <div id="layout-content" className="ui centered grid">
    <div className="fourteen wide column">
      <h2 className="ui center aligned header">Login</h2>

      <form className="ui large form" onSubmit={ login }>
        <div id="floating-column" className="ui raised segment">
          <div className="field">
            <div className="ui left icon input">
              <i className="user icon"></i>
              <input type="text" name="user" placeholder="Username" />
            </div>
          </div>
          <div className="field">
            <div className="ui left icon input">
              <i className="lock icon"></i>
              <input type="password" name="password" placeholder="Password" />
            </div>
          </div>
          <input type="submit" value="Login" className="ui fluid large primary submit button" />
        </div>
        <div className="ui error message"></div>
      </form>

      <div className="ui message">
        New to us? <a href="/register">Register</a>
      </div>

      <div className="ui message">
        Forgot your password? <a href="">Reset Password</a>
      </div>
    </div>
  </div>
)

export default Login
