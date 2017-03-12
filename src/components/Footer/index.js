import React, { Component } from 'react'
import {
  Nav,
  Navbar,
  NavItem
} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export class Footer extends Component {
  render() {
    return (
      <Navbar collapseOnSelect fluid fixedBottom>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to="/about">
              <NavItem eventKey={20} href="#">About</NavItem>
            </LinkContainer>
            <LinkContainer to="/contact-us">
              <NavItem eventKey={21} href="#">Contact Us</NavItem>
            </LinkContainer>
            <LinkContainer to="/privacy-policy">
              <NavItem eventKey={22} href="#">Privacy Policy</NavItem>
            </LinkContainer>
            <LinkContainer to="/terms-and-conditions">
              <NavItem eventKey={23} href="#">Terms and conditions</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default Footer
