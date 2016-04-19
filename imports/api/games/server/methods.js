import { Meteor } from 'meteor/meteor'

import Games from '../collection.js'

Meteor.methods({
  addGame: (options) => {
    let user = Meteor.userId()

    if (user) {
      let league = options.isLeagueGame
      if (league) var season = 2 // TODO: add way to change season in admin ui

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
        if (t.off === user) t.off = void 0
        if (t.def === user) t.def = void 0
      })

      let team = teams[details.team - 1]
      if (details.position === 'offense') {
        if (team.off) {
          throw new Meteor.Error('invalid-parameters', 'Team ' + details.team + ' offense is already taken')
        } else {
          team.off = user
        }
      } else {
        if (team.def) {
          throw new Meteor.Error('invalid-parameters', 'Team ' + details.team + ' defense is already taken')
        } else {
          team.def = user
        }
      }

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
  },

  completeGame: (results) => {
    let user = Meteor.userId()

    if (user) {
      let game = Games.findOne(results.gameId),
          teams = game.teams

      if (results.winner !== 1 && results.winner !== 2) {
        throw new Meteor.Error('invalid-parameters', 'Must declare a winner')
      }

      if (results.colors) {
        teams[0].color = results.colors[0]
        teams[1].color = results.colors[1]
      }

      if (isNaN(results.score[0])) {
        results.score = void 0
      }

      Games.update(results.gameId, { $set: {
        teams: teams,
        winner: results.winner,
        score: results.score,
        completed: new Date()
      }}, (err) => {
        if (err) {
          throw new Meteor.Error('db-update-fail', 'Games failed to update ' + results.gameId)
        }
      })
    } else {
      throw new Meteor.Error('invalid-permissions', 'You do not have valid permissions')
    }
  },

  deleteGame: (id) => {
    let user = Meteor.userId(),
        game = Games.findOne(id)

    if (!user) {
      throw new Meteor.Error('invalid-permissions', 'You do not have valid permissions')
    } else if (!game) {
      throw new Meteor.Error('invalid-parameters', id + ' does not match a game')
    } else if (game.winner) {
      throw new Meteor.Error('invalid-permissions', 'You cannot delete a finished game')
    } else {
      Games.remove(id, (err) => {
        if (err) {
          throw new Meteor.Error('db-remove-fail', 'Games failed to remove ' + id)
        }
      })
    }
  }
})
