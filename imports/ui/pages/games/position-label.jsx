import React from 'react'
import { Meteor } from 'meteor/meteor'

export default class PositionLabel extends React.Component {
  render() {
    let user = this.props.user,
        label

    if (user) {
      label = <div className="ui black label">{ this.props.user.displayName }</div>
    } else {
      let labelClass = 'ui label',
          position = this.props.position
          
      labelClass += position === 'offense' ? ' teal' : ' olive'
      label = <div className={ labelClass }>{ position }</div>
    }

    return label
  }
}

PositionLabel.propTypes = {
  position: React.PropTypes.string.isRequired,
  user: React.PropTypes.object
}
