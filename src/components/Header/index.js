import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  Nav,
  Navbar,
  NavItem,
  NavDropdown,
  MenuItem
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { IndexLink } from 'react-router';
import { Logout, HeaderProfile } from '..';

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
            {isAuthenticated && <NavDropdown eventKey={1}
                                             title="Accounts"
                                             id="basic-nav-dropdown">
              <LinkContainer to="/accounts">
                <MenuItem eventKey={1.1}>List</MenuItem>
              </LinkContainer>
              <LinkContainer to="/accounts/create">
                <MenuItem eventKey={1.1}>Create</MenuItem>
              </LinkContainer>
            </NavDropdown>}
            {isAuthenticated && <NavDropdown eventKey={2}
                                             title="Transactions"
                                             id="basic-nav-dropdown">
              <LinkContainer to="/transactions">
                <MenuItem eventKey={2.1}>List</MenuItem>
              </LinkContainer>
              <LinkContainer to="/transactions/create">
                <MenuItem eventKey={2.1}>Create</MenuItem>
              </LinkContainer>
            </NavDropdown>}
            {isAuthenticated && <NavDropdown eventKey={3}
                                             title="Categories"
                                             id="basic-nav-dropdown">
              <LinkContainer to="/categories">
                <MenuItem eventKey={3.1}>List</MenuItem>
              </LinkContainer>
              <LinkContainer to="/categories/create">
                <MenuItem eventKey={3.1}>Create</MenuItem>
              </LinkContainer>
            </NavDropdown>}
            {isAuthenticated && <NavDropdown eventKey={3}
                                             title="Recurring Payments"
                                             id="basic-nav-dropdown">
              <LinkContainer to="/recurring-payments">
                <MenuItem eventKey={4.1}>List</MenuItem>
              </LinkContainer>
              <LinkContainer to="/recurring-payments/create">
                <MenuItem eventKey={4.1}>Create</MenuItem>
              </LinkContainer>
            </NavDropdown>}
            {isAuthenticated && <NavDropdown eventKey={5}
                                             title="Currencies"
                                             id="basic-nav-dropdown">
              <LinkContainer to="/currencies/app">
                <MenuItem eventKey={5.1}>App Currencies</MenuItem>
              </LinkContainer>
              <LinkContainer to="/currencies/user">
                <MenuItem eventKey={5.2}>User Currencies</MenuItem>
              </LinkContainer>
            </NavDropdown>}
            {isAuthenticated && <NavDropdown eventKey={6}
                                             title="Reports"
                                             id="basic-nav-dropdown">
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
            {isAuthenticated && <LinkContainer to="/profile">
              <HeaderProfile user={user} eventKey={9} />
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

Header.propTypes = {
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { auth } = state;
  const { user, isAuthenticated } = auth;
  return { user, isAuthenticated };
}

export const HeaderConnected = connect(mapStateToProps, null, null, {
  pure: false
})(Header);

export default HeaderConnected;
