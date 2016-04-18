import React from 'react'
import { Meteor } from 'meteor/meteor'

import PositionButton from './position-button.jsx'
import CompleteGameForm from './complete-game-form.jsx'

export default class Game extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      completingGame: false,
      deletingGame: false
    }

    this.toggleComplete = this.toggleComplete.bind(this)
    this.stopComplete = this.stopComplete.bind(this)
    this.toggleDelete = this.toggleDelete.bind(this)
    this.stopDelete = this.stopDelete.bind(this)
    this.deleteGame = this.deleteGame.bind(this)
  }

  toggleComplete() {
    this.setState({
      completingGame: !this.state.completingGame,
      deletingGame: false
    })
  }

  stopComplete() {
    this.setState({
      completingGame: false,
      deletingGame: false
    })
  }

  toggleDelete() {
    this.setState({
      deletingGame: !this.state.deletingGame,
      completingGame: false
    })
  }

  stopDelete() {
    this.setState({
      deletingGame: false,
      completingGame: false
    })
  }

  deleteGame() {
    Meteor.call('deleteGame', this.props.game._id, (err, res) => {
      if (!err) {
        this.stopDelete()
      } else {
        console.error(err)
      }
    })
  }

  render() {
    let gameId = this.props.game._id,
        users = this.props.users,
        teams = this.props.game.teams,
        off1 = users.find((u) => u._id === teams[0].off),
        def1 = users.find((u) => u._id === teams[0].def),
        off2 = users.find((u) => u._id === teams[1].off),
        def2 = users.find((u) => u._id === teams[1].def)

    if (this.props.game.isLeagueGame) {
      var leaguelabel = <div className="ui red label">League</div>
    }

    if (this.state.completingGame) {
      var completeItem = <CompleteGameForm game={ this.props.game } users={ users } hide={ this.stopComplete } />
    }

    if (this.state.deletingGame) {
      var deleteItem = (
        <div className="padded-content">
          <div className="ui divider"></div>
          <h3 className="ui header">Delete game?</h3>
          <button type="button" onClick={ this.deleteGame } className="ui red fluid button">Delete</button>
          <button type="button" onClick={ this.stopDelete } className="ui fluid button">Cancel</button>
        </div>
      )
    }

    return (
      <div className="ui item">
        <div className="padded-content">
          <div className="ui grid">
            <div className="sixteen wide mobile ten wide tablet ten wide computer column">
              <div className="ui centered grid">
                <div className="sixteen wide mobile seven wide computer column">
                  <PositionButton gameId={ gameId } team={ 1 } position="offense" user={ off1 } />
                  <PositionButton gameId={ gameId } team={ 1 } position="defense" user={ def1 } />
                </div>
                <div className="sixteen wide mobile two wide computer column">
                  <span> vs. </span>
                </div>
                <div className="sixteen wide mobile seven wide computer column">
                  <PositionButton gameId={ gameId } team={ 2 } position="offense" user={ off2 } />
                  <PositionButton gameId={ gameId } team={ 2 } position="defense" user={ def2 } />
                </div>
              </div>
            </div>
            <div className="sixteen wide mobile six wide tablet six wide computer column">
              <div className="ui equal width grid">
                <div className="column">
                  { leaguelabel }
                </div>
                <div className="column">
                  <button type="button" onClick={ this.toggleComplete } className="ui icon button">
                    <i className="checkmark icon"></i>
                    Complete
                  </button>
                </div>
                <div className="column">
                  <button type="button" onClick={ this.toggleDelete } className="ui icon button">
                    <i className="trash icon"></i>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        { completeItem }
        { deleteItem }
      </div>
    )
  }
}

Game.propTypes = {
  game: React.PropTypes.object.isRequired,
  users: React.PropTypes.array
}
