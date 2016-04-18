import React from 'react'

export default class Home extends React.Component {
  render() {
    let games = this.props.games,
        completedGames = games.filter((g) => g.winner),
        leagueGames = completedGames.filter((g) => g.isLeagueGame),
        redWins = completedGames.filter((g) => g.teams[g.winner - 1].color === 'red'),
        whiteWins = completedGames.filter((g) => g.teams[g.winner - 1].color === 'white')

    return (
      <div>
        <div className="ui vertical center aligned segment">
          <div id="home-greeting" className="ui text container">
            <h1 className="ui header">Whose Foos?</h1>
            <h2>Consumer Services foosball coordinator tool</h2>
          </div>
        </div>
        <div className="ui vertical segment">
          <div id="layout-content" className="ui centered grid">
            <div className="eight wide mobile four wide tablet two wide computer column">
              <div className="ui statistic">
                <div className="label">
                  Completed Games
                </div>
                <div className="value">
                  { completedGames.length }
                </div>
              </div>
            </div>
            <div className="eight wide mobile four wide tablet two wide computer column">
              <div className="ui statistic">
                <div className="label">
                  League Games
                </div>
                <div className="value">
                  { leagueGames.length }
                </div>
              </div>
            </div>
            <div className="eight wide mobile four wide tablet two wide computer column">
              <div className="ui statistic">
                <div className="label">
                  Red Side Wins
                </div>
                <div className="value">
                  { redWins.length }
                </div>
              </div>
            </div>
            <div className="eight wide mobile four wide tablet two wide computer column">
              <div className="ui statistic">
                <div className="label">
                  White Side Wins
                </div>
                <div className="value">
                  { whiteWins.length }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Home.propTypes = {
  games: React.PropTypes.array
}
