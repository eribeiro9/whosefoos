import { Meteor } from 'meteor/meteor'

import Games from '../collection.js'

Meteor.methods({
  addGame: (options) => {
    let user = Meteor.userId()

    if (user) {
      let league = options.isLeagueGame
      if (league) var season = 2 // TODO: add way to change season in ui

      Games.insert({
        isLeagueGame: league,
        season: season,
        teams: [{
          color: ''
        }, {
          color: ''
        }],
        created: new Date()
      }, (err, doc) => {
        if (err) {
          throw new Meteor.Error('db-insert-fail', 'Games failed to insert game by ' + user)
        }
      })
    } else {
      throw new Meteor.Error('invalid-permissions', 'You do not have valid permissions')
    }
  },
  
  changePosition: (details) => {
    let user = Meteor.userId()

    if (user) {
      let gameId = details.gameId,
          game = Games.findOne(gameId),
          teams = game.teams

      teams.forEach((t) => {
        if (t.off === user) t.off = undefined
        if (t.def === user) t.def = undefined
      })

      if (details.position === 'offense') teams[details.team - 1].off = user
      else teams[details.team - 1].def = user

      Games.update(gameId, { $set: {
        teams: teams
      }}, (err) => {
        if (err) {
          throw new Meteor.Error('db-update-fail', 'Games failed to update ' + gameId)
        }
      })
    } else {
      throw new Meteor.Error('invalid-permissions', 'You do not have valid permissions')
    }
  }
})
