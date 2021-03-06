import React, { Component, PropTypes } from 'react'
import { NavItem } from 'react-bootstrap'
import { logoutUser } from '../../actions'

export class Logout extends Component {
  handleClick = () => {
    const { dispatch } = this.props
    dispatch(logoutUser())
  }

  render() {
    const { eventKey, onSelect } = this.props
    return (
      <NavItem onSelect={onSelect}
               eventKey={eventKey}
               onClick={this.handleClick} >Logout</NavItem>
    )
  }
}

Logout.propTypes = {
  dispatch: PropTypes.func.isRequired,
  eventKey: PropTypes.number.isRequired,
  onSelect: PropTypes.func
}

export default Logout
