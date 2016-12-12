import React, { Component } from 'react';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { IndexLink } from 'react-router';

class Header extends Component {
  render() {
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
            <LinkContainer to="/accounts">
              <NavItem eventKey={1}>Accounts</NavItem>
            </LinkContainer>
            <LinkContainer to="/blotter">
              <NavItem eventKey={2} href="#">Blotter</NavItem>
            </LinkContainer>
            <LinkContainer to="/categories">
              <NavItem eventKey={2} href="#">Categories</NavItem>
            </LinkContainer>
            <LinkContainer to="/recurring-payments">
              <NavItem eventKey={2} href="#">Recurring Payments</NavItem>
            </LinkContainer>
            <NavDropdown eventKey={3} title="Currencies" id="basic-nav-dropdown">
              <LinkContainer to="/currencies/app">
                <MenuItem eventKey={3.1}>App Currencies</MenuItem>
              </LinkContainer>
              <LinkContainer to="/currencies/user">
                <MenuItem eventKey={3.2}>User Currencies</MenuItem>
              </LinkContainer>
            </NavDropdown>
            <NavDropdown eventKey={3} title="Reports" id="basic-nav-dropdown">
              <LinkContainer to="/reports/calendar">
                <MenuItem eventKey={3.1}>Calendar</MenuItem>
              </LinkContainer>
              <LinkContainer to="/reports/by-category">
                <MenuItem eventKey={3.2}>By Category</MenuItem>
              </LinkContainer>
              <LinkContainer to="/reports/by-period">
                <MenuItem eventKey={3.3}>By Period</MenuItem>
              </LinkContainer>
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            <LinkContainer to="/profile">
              <NavItem eventKey={2} href="#">Profile</NavItem>
            </LinkContainer>
            <LinkContainer to="/login">
              <NavItem eventKey={2} href="#">Login</NavItem>
            </LinkContainer>
            <LinkContainer to="/logout">
              <NavItem eventKey={2} href="#">Logout</NavItem>
            </LinkContainer>
            <LinkContainer to="/register">
              <NavItem eventKey={2} href="#">Register</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
