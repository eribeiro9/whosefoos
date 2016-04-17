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
    if (user) {
      return <div className="ui black label">{ user.displayName }</div>
    } else {
      let buttonClass = 'ui mini button',
          positionIsOff = this.props.position === 'offense'

      buttonClass += positionIsOff ? ' teal' : ' olive'

      return <button type="button" onClick={ this.choosePosition } className={ buttonClass }>{ this.props.position }</button>
    }
  }
}

PositionButton.propTypes = {
  gameId: React.PropTypes.string.isRequired,
  team: React.PropTypes.number.isRequired,
  position: React.PropTypes.string.isRequired,
  user: React.PropTypes.object
}
