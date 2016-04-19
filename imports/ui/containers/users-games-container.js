import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'

import Games from '../../api/games/collection.js'
import Layout from '../layouts/layout.jsx'

export default createContainer((params) => {
  const { content } = params
  const usersSub = Meteor.subscribe('allUsers')
  const gamesSub = Meteor.subscribe('allGames')
  const isLoading = !(usersSub.ready() && gamesSub.ready())
  const games = Games.find().fetch()
  const users = Meteor.users.find().fetch().map((u) => {
    let gamesPlayed = games.filter((g) => g.winner && g.teams.some((t) => t.off === u._id || t.def === u._id)),
        wins = gamesPlayed.filter((g) => {
          let team = g.teams[g.winner - 1]
          return team.off === u._id || team.def === u._id
        }).length,
        losses = gamesPlayed.length - wins

    let wlRatio = wins + losses > 0 && losses > 0
      ? (wins / losses).toFixed(2)
      : wins.toFixed(2)

    u.stats = {
      gamesPlayed: gamesPlayed.length,
      gamesWon: wins,
      gamesLost: losses,
      wlRatio: wlRatio
    }
    return u
  }).sort((a, b) => {
    if (a.stats.wlRatio === b.stats.wlRatio) {
      return b.stats.gamesPlayed - a.stats.gamesPlayed
    }
    return b.stats.wlRatio - a.stats.wlRatio
  })

  return {
    content,
    isLoading,
    users,
    games
  }
}, Layout)
