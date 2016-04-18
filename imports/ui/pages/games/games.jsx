import React from 'react'
import { Meteor } from 'meteor/meteor'

import Game from './game.jsx'
import AddGameSegment from './add-game-segment.jsx'

export default class Games extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      addingGame: false
    }

    this.addGame = this.addGame.bind(this)
    this.cancelAdd = this.cancelAdd.bind(this)
  }

  addGame() {
    this.setState({
      addingGame: true
    })
  }

  cancelAdd() {
    this.setState({
      addingGame: false
    })
  }

  renderGames() {
    let pendingGames = this.props.games.filter((g) => !g.winner).sort((a, b) => a.created > b.created)

    if (pendingGames.length === 0) return <div className="padded-content">No pending games</div>

    return pendingGames.map((g, i) =>
      <Game key={ i } game={ g } users={ this.props.users } />
    )
  }

  render() {
    let gameButton, gameSegment

    if (this.state.addingGame) {
      gameButton = <button onClick={ this.cancelAdd } className="ui fluid red button">Cancel</button>
      gameSegment = <AddGameSegment hide={ this.cancelAdd } />
    } else if (Meteor.userId()) {
      gameButton = <button onClick={ this.addGame } className="ui fluid green button">Add game</button>
    } else {
      gameButton = <span>Login to add a new game</span>
    }

    return (
      <div id="layout-content" className="ui centered grid">
        <div className="fourteen wide column">
          <div className="ui raised segments">
            <div className="ui segment">
              { gameButton }
            </div>
            { gameSegment }
            <div className="ui not padded segment">
              <div className="ui divided list">
                { this.renderGames() }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Games.propTypes = {
  users: React.PropTypes.array,
  games: React.PropTypes.array
}
