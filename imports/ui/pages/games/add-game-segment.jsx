import React from 'react'
import { Meteor } from 'meteor/meteor'

export default class AddGameSegment extends React.Component {
  constructor(props) {
    super(props)

    this.addGame = this.addGame.bind(this)
  }

  componentDidMount() {
    $('#leagueCheckbox').checkbox()
  }

  addGame(e) {
    e.preventDefault()

    Meteor.call('addGame', {
      isLeagueGame: e.target.league.checked
    }, (err, res) => {
      if (err) {
        console.error(err)
      } else {
        this.props.hide()
      }
    })
  }

  render() {
    return (
      <div className="ui segment">
        <form onSubmit={ this.addGame } className="ui form">
          <div className="field">
            <div id="leagueCheckbox" className="ui toggle checkbox">
              <label>Is League Game</label>
              <input type="checkbox" name="league" />
            </div>
          </div>
          <input type="submit" value="Submit" className="ui fluid primary button" />
        </form>
      </div>
    )
  }
}

AddGameSegment.propTypes = {
  hide: React.PropTypes.func.isRequired
}
