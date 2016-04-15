import { Meteor } from 'meteor/meteor'

Meteor.methods({
  updateUser(newSettings) {
    let userId = Meteor.userId()

    if (userId) {
      Meteor.users.update(userId, { $set: {
        displayName: newSettings.displayName,
        status: newSettings.status,
        positions: newSettings.positions
      }}, (err) => {
        if (err) {
          throw new Meteor.Error('db-update-fail', 'Users failed to update ' + userId)
        }
      })
    } else {
      throw new Meteor.Error('invalid-permissions', 'You do not have valid permissions')
    }
  }
})
