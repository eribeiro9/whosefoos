import React from 'react'

export default class Users extends React.Component {
  renderUsers() {
    return this.props.users.map((u, i) => (
      <div key={ i } className="item">
        <div className="content">
          <div className="header">{ u.displayName }</div>
          { u.status }
        </div>
      </div>
    ))
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
  users: React.PropTypes.array
}
