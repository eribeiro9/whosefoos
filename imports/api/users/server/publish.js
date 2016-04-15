import { Meteor } from 'meteor/meteor'

Meteor.publish('allUsers', () => Meteor.users.find())
