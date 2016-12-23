import React, { Component, PropTypes } from 'react';
import { NavItem } from 'react-bootstrap';
import { logoutUser } from '../../actions';

class Logout extends Component {
  handleClick = () => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  }

  render() {
    return (
      <NavItem eventKey={11} onClick={this.handleClick}>Logout</NavItem>
    );
  }
}

Logout.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default Logout;