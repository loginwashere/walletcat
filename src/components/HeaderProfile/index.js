import React, { Component, PropTypes } from 'react';
import { NavItem, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import './style.less';

export class HeaderProfile extends Component {
  render() {
    const { user } = this.props;
    return (
      <LinkContainer to="/profile">
        <NavItem className={'profile'} eventKey={9}>
          <Image src={user.avatar} circle />
          <span className={'profile-username'}>{user.username}</span>
        </NavItem>
      </LinkContainer>
    );
  }
}

HeaderProfile.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string
  }).isRequired,
  eventKey: PropTypes.number.isRequired
}

export default HeaderProfile;
