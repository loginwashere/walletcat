import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Nav,
  Navbar,
  NavItem,
  NavDropdown,
  MenuItem,
  Image
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { IndexLink } from 'react-router';
import Logout from '../Logout/Logout';

import './Header.css';

export class Header extends Component {
  render() {
    const { user, isAuthenticated, dispatch } = this.props;
    return (
      <Navbar collapseOnSelect fixedTop>
        <Navbar.Header>
            <Navbar.Brand>
              <IndexLink to="/">
                Wallet Cat
              </IndexLink>
            </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            {isAuthenticated && <LinkContainer to="/accounts">
              <NavItem eventKey={1}>Accounts</NavItem>
            </LinkContainer>}
            {isAuthenticated && <LinkContainer to="/blotter">
              <NavItem eventKey={2} href="#">Blotter</NavItem>
            </LinkContainer>}
            {isAuthenticated && <LinkContainer to="/categories">
              <NavItem eventKey={3} href="#">Categories</NavItem>
            </LinkContainer>}
            {isAuthenticated && <LinkContainer to="/recurring-payments">
              <NavItem eventKey={4} href="#">Recurring Payments</NavItem>
            </LinkContainer>}
            {isAuthenticated && <NavDropdown eventKey={5} title="Currencies" id="basic-nav-dropdown">
              <LinkContainer to="/currencies/app">
                <MenuItem eventKey={5.1}>App Currencies</MenuItem>
              </LinkContainer>
              <LinkContainer to="/currencies/user">
                <MenuItem eventKey={5.2}>User Currencies</MenuItem>
              </LinkContainer>
            </NavDropdown>}
            {isAuthenticated && <NavDropdown eventKey={6} title="Reports" id="basic-nav-dropdown">
              <LinkContainer to="/reports/calendar">
                <MenuItem eventKey={6.1}>Calendar</MenuItem>
              </LinkContainer>
              <LinkContainer to="/reports/by-category">
                <MenuItem eventKey={6.2}>By Category</MenuItem>
              </LinkContainer>
              <LinkContainer to="/reports/by-period">
                <MenuItem eventKey={6.3}>By Period</MenuItem>
              </LinkContainer>
            </NavDropdown>}
            <LinkContainer to="/about">
              <NavItem eventKey={7} href="#">About</NavItem>
            </LinkContainer>
            <LinkContainer to="/contact-us">
              <NavItem eventKey={8} href="#">Contact Us</NavItem>
            </LinkContainer>
          </Nav>
          <Nav pullRight>
            {isAuthenticated && <LinkContainer to="/profile" className={'profile'}>
              <NavItem eventKey={9} href="#">
                <Image src={user.avatar} circle />
                <span className={'profile-username'}>{user.username}</span>
              </NavItem>
            </LinkContainer>}
            {!isAuthenticated && <LinkContainer to="/login">
              <NavItem eventKey={10} href="#">Login</NavItem>
            </LinkContainer>}
            {isAuthenticated && <LinkContainer to="/logout">
              <Logout dispatch={dispatch} />
            </LinkContainer>}
            {!isAuthenticated && <LinkContainer to="/register">
              <NavItem eventKey={12} href="#">Register</NavItem>
            </LinkContainer>}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

function mapStateToProps(state) {
  const { auth } = state;
  const { user, isAuthenticated } = auth;
  return { user, isAuthenticated };
}

export default connect(mapStateToProps, null, null, {
  pure: false
})(Header);
