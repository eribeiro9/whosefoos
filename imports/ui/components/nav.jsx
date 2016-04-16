import React from 'react'
import { Meteor } from 'meteor/meteor'
import { FlowRouter } from 'meteor/kadira:flow-router'

export default class Nav extends React.Component {
  componentDidMount() {
    $('#collapse-bar').dropdown()
  }

  logout(e) {
    FlowRouter.go('home')
    Meteor.logout()
  }

  render() {
    let userIcon, username, loginItem, registerItem, settingsItem, logoutItem

    if (this.props.user) {
      userIcon = <i className="user icon"></i>
      username = this.props.user.username
      settingsItem = <a href="/settings" className="item">Settings</a>
      logoutItem = <a onClick={ this.logout } className="item">Logout</a>
    } else {
      userIcon = <i className="remove user icon"></i>
      loginItem = <a href="/login" className="item">Login</a>
      registerItem = <a href="/register" className="item">Register</a>
    }

    let navMenu = (
      <div className="menu">
        <div className="header">Pages</div>
        <a href="/" className="item">Home</a>
        <a href="/games" className="item">Games</a>
        <a href="/users" className="item">Users</a>
        <div className="divider"></div>
        <div className="header">Profile</div>
        { loginItem }
        { registerItem }
        { settingsItem }
        { logoutItem }
      </div>
    )

    return (
      <div id="site-nav" className="ui inverted compact menu">
        <div id="collapse-bar" className="ui dropdown item">
          <i className="sidebar icon"></i>
          <span className="nav-username">{ username }</span>
          { userIcon }
          { navMenu }
        </div>
      </div>
    )
  }
}

Nav.propTypes = {
  user: React.PropTypes.object
}
