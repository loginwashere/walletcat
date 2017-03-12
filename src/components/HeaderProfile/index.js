import React, { Component, PropTypes } from 'react'
import { NavDropdown, MenuItem, Image } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Logout from '../Logout'

import './style.less'

const Profile = ({ username, avatar }) => (
  <span>
    <Image src={avatar} circle />
    <span className={'profile-username'}>{username}</span>
  </span>
)

Profile.propTypes = {
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired
}

export class HeaderProfile extends Component {
  render() {
    const { user, dispatch, onSelect } = this.props

    return (
      <NavDropdown eventKey={9}
                   title={Profile(user)}
                   className="profile"
                   id="profile-menu-item-dropdown"
                   onSelect={onSelect}>
        <LinkContainer to="/profile">
          <MenuItem eventKey={9.1}>Profile</MenuItem>
        </LinkContainer>
        <MenuItem divider />
        <LinkContainer to="/logout">
          <Logout eventKey={9.2}
                  dispatch={dispatch}
                  onSelect={onSelect} />
        </LinkContainer>
      </NavDropdown>
    )
  }
}

HeaderProfile.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string
  }).isRequired,
  onSelect: PropTypes.func,
  eventKey: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default HeaderProfile
