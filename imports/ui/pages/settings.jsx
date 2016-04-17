import React from 'react'
import { Meteor } from 'meteor/meteor'

export default class Settings extends React.Component {
  constructor(props) {
    super(props)

    this.user = props.users.find((u) => u._id === Meteor.userId())
    this.state = {
      isChanged: false
    }

    this.resetForm = this.resetForm.bind(this)
    this.changeForm = this.changeForm.bind(this)
    this.updateSettings = this.updateSettings.bind(this)
  }

  componentDidMount() {
    $('#offenseCheckbox').checkbox()
    $('#defenseCheckbox').checkbox()
  }

  resetForm(e) {
    e.preventDefault()

    e.target.display.value = this.user.displayName
    e.target.status.value = this.user.status
    e.target.offense.checked = this.user.positions.includes('offense')
    e.target.defense.checked = this.user.positions.includes('defense')

    this.setState({
      isChanged: false
    })
  }

  changeForm(e) {
    e.preventDefault()

    let formDisplay = e.target.form.display.value
    let formStatus = e.target.form.status.value
    let formOffense = e.target.form.offense.checked
    let formDefense = e.target.form.defense.checked
    let gameDisplay = this.user.displayName
    let gameStatus = this.user.status
    let gameOffense = this.user.positions.includes('offense')
    let gameDefense = this.user.positions.includes('defense')

    this.setState({
      isChanged: formDisplay !== gameDisplay
              || formStatus !== gameStatus
              || formOffense !== gameOffense
              || formDefense !== gameDefense
    })
  }

  updateSettings(e) {
    e.preventDefault()

    let positions = []
    if (e.target.offense.checked) positions.push('offense')
    if (e.target.defense.checked) positions.push('defense')

    Meteor.call('updateUser', {
      displayName: e.target.display.value,
      status: e.target.status.value,
      positions: positions
    }, (err, res) => {
      if (!err) {
        this.setState({
          isChanged: false
        })
      } else {
        console.error(err)
      }
    })
  }

  render() {
    let displayName = this.user.displayName
    let status = this.user.status
    let offense = this.user.positions.includes('offense')
    let defense = this.user.positions.includes('defense')

    let buttonClass = 'ui fluid button'
    if (!this.state.isChanged) buttonClass += ' disabled'

    return (
      <div id="layout-content" className="ui centered grid">
        <div className="twelve wide column">
          <form onChange={ this.changeForm } onSubmit={ this.updateSettings } onReset={ this.resetForm } className="ui form">
            <div id="floating-column" className="ui raised segment">
              <div className="field">
                <label>Display Name</label>
                <input type="text" name="display" placeholder="Display Name" defaultValue={ displayName } />
              </div>
              <div className="field">
                <label>Status</label>
                <input type="text" name="status" placeholder="Status" defaultValue={ status } />
              </div>
              <div className="field">
                <div id="offenseCheckbox" className="ui toggle checkbox">
                  <label>Offense</label>
                  <input type="checkbox" name="offense" defaultChecked={ offense } className="hidden" />
                </div>
              </div>
              <div className="field">
                <div id="defenseCheckbox" className="ui toggle checkbox">
                  <label>Defense</label>
                  <input type="checkbox" name="defense" defaultChecked={ defense } className="hidden" />
                </div>
              </div>
              <input type="submit" value="Submit" className={ buttonClass + ' primary' } />
              <input type="reset" value="Reset" className={ buttonClass } />
            </div>
          </form>
        </div>
      </div>
    )
  }
}

Settings.propTypes = {
  users: React.PropTypes.array
}
