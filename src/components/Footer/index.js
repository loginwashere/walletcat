import React, { Component } from 'react';
import {
  Nav,
  Navbar,
  NavItem
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export class Footer extends Component {
  render() {
    return (
      <Navbar collapseOnSelect fixedBottom>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to="/about">
              <NavItem eventKey={7} href="#">About</NavItem>
            </LinkContainer>
            <LinkContainer to="/contact-us">
              <NavItem eventKey={8} href="#">Contact Us</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default Footer;