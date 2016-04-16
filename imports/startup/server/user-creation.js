import { Accounts } from 'meteor/accounts-base'

let randomStatus = () => {
  let options = [
    'When I foos, you lose!',
    'My foos is no ruse',
    'Choose your foos!',
    "When I don't foos, I snooze"
  ]
  let index = Math.floor(Math.random() * options.length)
  return options[index]
}

Accounts.onCreateUser((options, user) => {
  user.profile = user.profile || options.profile
  user.displayName = user.username
  user.status = randomStatus()
  user.positions = []

  return user
})
