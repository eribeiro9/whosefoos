import React from 'react'
import { Meteor } from 'meteor/meteor'

import PositionLabel from './position-label.jsx'

export default class CompleteGameForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      team1Won: false,
      team2Won: false,
      team1Red: false,
      team1White: false
    }

    this.team1Winning = this.team1Winning.bind(this)
    this.team2Winning = this.team2Winning.bind(this)
    this.team1Red = this.team1Red.bind(this)
    this.team1White = this.team1White.bind(this)
    this.completeGame = this.completeGame.bind(this)
  }

  team1Winning() {
    this.setState({
      team1Won: true,
      team2Won: false
    })
  }

  team2Winning() {
    this.setState({
      team1Won: false,
      team2Won: true
    })
  }

  team1Red() {
    this.setState({
      team1Red: true,
      team1White: false
    })
  }

  team1White() {
    this.setState({
      team1Red: false,
      team1White: true
    })
  }

  completeGame(e) {
    e.preventDefault()

    if (this.state.team1Red || this.state.team1White) {
      var colors = this.state.team1Red ? ['red', 'white'] : ['white', 'red']
    }

    Meteor.call('completeGame', {
      gameId: this.props.game._id,
      winner: 1 + this.state.team2Won,
      colors: colors,
      score: [e.target.team1Score.value, e.target.team2Score.value]
    }, (err, res) => {
      if (!err) {
        this.props.hide()
      } else {
        console.error(err)
      }
    })
  }

  render() {
    let game = this.props.game,
        teams = game.teams,
        users = this.props.users,
        off1 = users.find((u) => u._id === teams[0].off),
        def1 = users.find((u) => u._id === teams[0].def),
        off2 = users.find((u) => u._id === teams[1].off),
        def2 = users.find((u) => u._id === teams[1].def),
        team1Winner = <button type="button" onClick={ this.team1Winning } className="ui button">Winner?</button>,
        team2Winner = <button type="button" onClick={ this.team2Winning } className="ui button">Winner?</button>,
        winner = <button type="button" className="ui green disabled button"><i className="checkmark icon"></i> Winner</button>,
        team1Red = <button type="button" onClick={ this.team1Red } className="ui red button">Red?</button>,
        team1White = <button type="button" onClick={ this.team1White } className="ui button">White?</button>,
        team2Red = <button type="button" onClick={ this.team1White } className="ui red button">Red?</button>,
        team2White = <button type="button" onClick={ this.team1Red } className="ui button">White?</button>,
        submitClass = 'ui primary fluid button'

    if (this.state.team1Won) team1Winner = winner
    else if (this.state.team2Won) team2Winner = winner

    if (this.state.team1Red) {
      team1Red = <button type="button" className="ui red disabled button"><i className="checkmark icon"></i> Red</button>
      team2White = <button type="button" className="ui disabled button"><i className="checkmark icon"></i> White</button>
    } else if (this.state.team1White) {
      team1White = <button type="button" className="ui disabled button"><i className="checkmark icon"></i> White</button>
      team2Red = <button type="button" className="ui red disabled button"><i className="checkmark icon"></i> Red</button>
    }

    if (game.isLeagueGame
        && (!(this.state.team1Won || this.state.team2Won)
        || !(this.state.team1Red || this.state.team1White))) {
      submitClass += ' disabled'
    } else if (!game.isLeagueGame && !(this.state.team1Won || this.state.team2Won)) {
      submitClass += ' disabled'
    }

    return (
      <div className="padded-content">
        <div className="ui divider"></div>
        <form onSubmit={ this.completeGame } className="ui form">
          <div className="ui grid">
            <div className="sixteen wide mobile eight wide tablet eight wide computer column">
              <div className="ui one column centered grid">
                <div className="column">
                  <PositionLabel position="offense" user={ off1 } />
                  <PositionLabel position="defense" user={ def1 } />
                </div>
                <div className="column">
                  { team1Winner }
                </div>
                <div className="column">
                  { team1Red }
                  { team1White }
                </div>
                <div className="column">
                  <div className="field">
                    <label>Score</label>
                    <input type="number" name="team1Score" min="0" max="10" />
                  </div>
                </div>
              </div>
            </div>
            <div className="sixteen wide mobile eight wide tablet eight wide computer column">
              <div className="ui one column centered grid">
                <div className="column">
                  <PositionLabel position="offense" user={ off2 } />
                  <PositionLabel position="defense" user={ def2 } />
                </div>
                <div className="column">
                  { team2Winner }
                </div>
                <div className="column">
                  { team2Red }
                  { team2White }
                </div>
                <div className="column">
                  <div className="field">
                    <label>Score</label>
                    <input type="number" name="team2Score" min="0" max="10" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <input type="submit" value="Complete" className={ submitClass } />
          <button type="button" onClick={ this.props.hide } className="ui fluid button">Cancel</button>
        </form>
      </div>
    )
  }
}

CompleteGameForm.propTypes = {
  game: React.PropTypes.object,
  users: React.PropTypes.array,
  hide: React.PropTypes.func
}
