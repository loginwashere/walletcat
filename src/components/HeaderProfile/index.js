import React, { Component, PropTypes } from 'react';
import { NavItem, Image } from 'react-bootstrap';

import './style.css';

export class HeaderProfile extends Component {
  render() {
    const { user, eventKey } = this.props;
    return (
      <NavItem eventKey={eventKey} href="#" className={'profile'}>
        <Image src={user.avatar} circle />
        <span className={'profile-username'}>{user.username}</span>
      </NavItem>
    );
  }
}

HeaderProfile.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string
  }).isRequired,
  eventKey: PropTypes.number
}

export default HeaderProfile;
