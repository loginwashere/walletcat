import React, { Component, PropTypes } from 'react';
import { NavItem } from 'react-bootstrap';
import { logoutUser } from '../../actions';

export class Logout extends Component {
  handleClick = () => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  }

  render() {
    const { eventKey } = this.props;
    return (
      <NavItem {...this.props}
               eventKey={eventKey}
               onClick={this.handleClick} >Logout</NavItem>
    );
  }
}

Logout.propTypes = {
  dispatch: PropTypes.func.isRequired,
  eventKey: PropTypes.number.isRequired
};

export default Logout;
