import React from 'react'
import { Meteor } from 'meteor/meteor'

import PositionButton from './position-button.jsx'

export default class Game extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let gameId = this.props.game._id,
        users = this.props.users,
        teams = this.props.game.teams,
        off1 = users.find((u) => u._id === teams[0].off),
        def1 = users.find((u) => u._id === teams[0].def),
        off2 = users.find((u) => u._id === teams[1].off),
        def2 = users.find((u) => u._id === teams[1].def)

    return (
      <div className="ui item">
        <div className="content">
          <PositionButton gameId={ gameId } team={ 1 } position="offense" user={ off1 } />
          <PositionButton gameId={ gameId } team={ 1 } position="defense" user={ def1 } />
          <span> vs. </span>
          <PositionButton gameId={ gameId } team={ 2 } position="offense" user={ off2 } />
          <PositionButton gameId={ gameId } team={ 2 } position="defense" user={ def2 } />
        </div>
      </div>
    )
  }
}

Game.propTypes = {
  game: React.PropTypes.object.isRequired,
  users: React.PropTypes.array
}
