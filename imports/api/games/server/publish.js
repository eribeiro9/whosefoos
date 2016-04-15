import { Meteor } from 'meteor/meteor'

import Games from '../collection.js'

Meteor.publish('allGames', () => Games.find())
