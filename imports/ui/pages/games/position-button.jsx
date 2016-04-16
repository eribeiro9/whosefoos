import React from 'react'
import { Meteor } from 'meteor/meteor'

export default class PositionButton extends React.Component {
  constructor(props) {
    super(props)

    this.choosePosition = this.choosePosition.bind(this)
  }

  choosePosition(e) {
    e.preventDefault()

    Meteor.call('changePosition', {
      gameId: this.props.gameId,
      team: this.props.team,
      position: this.props.position
    }, (err, res) => {
      if (err) {
        console.error(err)
      }
    })
  }

  render() {
    let user = this.props.user
    return user
      ? <div className="ui label">{ user.displayName }</div>
    : <button type="button" onClick={ this.choosePosition } className="ui mini button">{ this.props.position }</button>
  }
}

PositionButton.propTypes = {
  gameId: React.PropTypes.string.isRequired,
  team: React.PropTypes.number.isRequired,
  position: React.PropTypes.string.isRequired,
  user: React.PropTypes.object
}
