import React from 'react'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { mount } from 'react-mounter'

import UsersGamesContainer from '../../ui/containers/usersGamesContainer.js'
import Home from '../../ui/pages/home.jsx'
import Login from '../../ui/pages/login.jsx'
import Register from '../../ui/pages/register.jsx'
import Users from '../../ui/pages/users.jsx'
import Settings from '../../ui/pages/settings.jsx'

FlowRouter.route('/', {
  name: 'home',
  action() {
    mount(UsersGamesContainer, {
      content: <Home />
    })
  }
})

FlowRouter.route('/login', {
  name: 'login',
  action() {
    mount(UsersGamesContainer, {
      content: <Login />
    })
  }
})

FlowRouter.route('/register', {
  name: 'register',
  action() {
    mount(UsersGamesContainer, {
      content: <Register />
    })
  }
})

FlowRouter.route('/users', {
  name: 'users',
  action() {
    mount(UsersGamesContainer, {
      content: <Users />
    })
  }
})

FlowRouter.route('/settings', {
  name: 'settings',
  action() {
    mount(UsersGamesContainer, {
      content: <Settings />
    })
  }
})
