import React from 'react'
import { Accounts } from 'meteor/accounts-base'
import { FlowRouter } from 'meteor/kadira:flow-router'

register = (e) => {
  e.preventDefault()

  let username = e.target.username.value
  let password = e.target.password.value
  let verify = e.target.verify.value

  if (username && password && password == verify) {
    Accounts.createUser({
      username: username,
      password: password
    }, (err) => {
      if (!err) {
        FlowRouter.go('home')
      } else {
        console.error(err)
      }
    })
  }
}

const Register = () => (
  <div id="layout-content" className="ui centered grid">
    <div className="fourteen wide column">
      <h2 className="ui center aligned header">Register</h2>

      <form className="ui form" onSubmit={ register }>
        <div id="floating-column" className="ui raised segment">
          <div className="field">
            <label>Username</label>
            <input type="text" name="username" placeholder="Username" />
          </div>
          <div className="field">
            <label>Password</label>
            <input type="password" name="password" placeholder="Password" />
          </div>
          <div className="field">
            <label>Verify Password</label>
            <input type="password" name="verify" placeholder="Verify Password" />
          </div>
          <input type="submit" value="Register" className="ui fluid large primary submit button" />
        </div>
      </form>

      <div className="ui message">
        Already have an account? <a href="/login">Login</a>
      </div>
    </div>
  </div>
)

export default Register
