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
    let userIcon, username, profileItem

    if (this.props.user) {
      userIcon = <i className="user icon"></i>
      username = this.props.user.username
      profileItem = (
        <div className="item">
          <div className="header">Profile</div>
          <div className="menu">
            <a href="/settings" className="item">Settings</a>
            <a onClick={ this.logout } className="item">Logout</a>
          </div>
        </div>
      )
    } else {
      userIcon = <i className="remove user icon"></i>
      profileItem = (
        <div className="item">
          <div className="header">Profile</div>
          <div className="menu">
            <a href="/login" className="item">Login</a>
            <a href="/register" className="item">Register</a>
          </div>
        </div>
      )
    }

    let navMenu = (
      <div className="vertical menu">
        <div className="item">
          <div className="header">Pages</div>
          <div className="menu">
            <a href="/" className="item">Home</a>
            <a href="/users" className="item">Users</a>
          </div>
        </div>
        { profileItem }
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
