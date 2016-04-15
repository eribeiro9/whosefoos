import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'

import Games from '../../api/games/collection.js'
import Layout from '../layouts/layout.jsx'

export default createContainer((params) => {
  const { content } = params
  const usersSub = Meteor.subscribe('allUsers')
  const gamesSub = Meteor.subscribe('allGames')
  const isLoading = !(usersSub.ready() && gamesSub.ready())
  const users = Meteor.users.find().fetch()
  const games = Games.find().fetch()
  return {
    content,
    isLoading,
    users,
    games
  }
}, Layout)
