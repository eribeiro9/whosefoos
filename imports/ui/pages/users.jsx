import React from 'react'

export default class Users extends React.Component {
  renderUsers() {
    let users = this.props.users,
        games = this.props.games

    if (users.length === 0) return <span>No users</span>

    return users.map((u, i) => {
      if (u.positions.includes('offense')) {
        var offLabel = <div className="ui teal label">offense</div>
      }
      if (u.positions.includes('defense')) {
        var defLabel = <div className="ui olive label">defense</div>
      }

      return (
        <div key={ i } className="item">
          <div className="right floated content">
            <div className="ui tiny statistic">
              <div className="label">
                Games Played
              </div>
              <div className="value">
                { u.stats.gamesPlayed }
              </div>
            </div>
            <div className="ui tiny statistic">
              <div className="label">
                W/L Ratio
              </div>
              <div className="value">
                { u.stats.wlRatio }
              </div>
            </div>
          </div>
          <div className="content">
            <div className="header">{ u.displayName }</div>
            { u.status }
            { offLabel }
            { defLabel }
          </div>
        </div>
      )
    })
  }

  render() {
    return (
      <div id="layout-content" className="ui centered grid">
        <div className="twelve wide column">
          <div id="floating-column" className="ui raised segment">
            <div className="ui divided list">
              { this.renderUsers() }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Users.propTypes = {
  users: React.PropTypes.array,
  games: React.PropTypes.array
}
