import React from 'react'

import Loading from '../components/loading.jsx'
import Nav from '../components/nav.jsx'

export default class Layout extends React.Component {
  render() {
    if (this.props.isLoading) return <Loading />

    let thisUser = Meteor.user()
    let content = React.cloneElement(this.props.content, {
      users: this.props.users,
      games: this.props.games
    })

    return (
      <div>
        { content }
        <Nav user={ thisUser }/>
      </div>
    )
  }
}

Layout.propTypes = {
  content: React.PropTypes.element.isRequired,
  isLoading: React.PropTypes.bool,
  users: React.PropTypes.array,
  games: React.PropTypes.array
}
