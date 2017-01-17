import React, { Component } from 'react'
import { Link } from 'react-router'
import Waypoint from 'react-waypoint'
import Scroll from 'react-scroll'
import {
  Navbar,
  Nav,
  NavItem
} from 'react-bootstrap'
import HeaderBrandLink from '../HeaderBrandLink'

import image from './img/demo-screen1.png'

import './style.less'

export class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fixNav: false
    }
  }

  handleNavEnter = () => {
    this.setState({ fixNav: false })
  }

  handleNavLeave = () => {
    this.setState({ fixNav: true })
  }

  handleNavPositionChange = ({ currentPosition }) => {
    if (currentPosition === Waypoint.above && this.state.fixNav !== true) {
      this.setState({ fixNav: true })
    }
  }

  render() {
    const { fixNav } = this.state
    return (
      <div id="page-top" className="landing">

        <Navbar collapseOnSelect
                id="mainNav"
                className={`navbar navbar-default navbar-fixed-top ${fixNav ? 'affix' : 'affix-top'}`}>
          <Navbar.Header>
              <HeaderBrandLink to="page-top" scroll={true} duration={1500} delay={100} smooth={true} />
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
                <li>
                  <Scroll.Link to="features" duration={1500} delay={100} smooth={true}>Features</Scroll.Link>
                </li>
                <li>
                  <Scroll.Link to="contact" duration={1500} delay={100} smooth={true}>Contact</Scroll.Link>
                </li>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Waypoint
          onEnter={this.handleNavEnter}
          onLeave={this.handleNavLeave}
          onPositionChange={this.handleNavPositionChange}/>

        <header>
          <div className="container">
            <div className="row">
              <div className="col-sm-4">
                <div className="header-content">
                  <div className="header-content-inner">
                    <h1>Wallet Cat helps you manage your finances</h1>
                    <Link to="/register" className="btn btn-outline btn-xl page-scroll">Start Now for Free!</Link>
                  </div>
                </div>
              </div>
              <div className="col-sm-8">
                <div className="device-container">
                  <div className="device-mockup" data-device="macbook">
                    <div className="device">
                      <div className="screen">
                        {/*<!-- Demo image for screen mockup, you can put an image here,
                          some HTML, an animation, video, or anything else! -->*/}
                        <img src={image} className="img-responsive" alt="" />
                      </div>
                      <div className="button">
                        {/*<!-- You can hook the "home button" to some JavaScript events or just remove it -->*/}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section id="features" className="features">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <div className="section-heading">
                  <h2>Unlimited Features, Unlimited Fun</h2>
                  <p className="text-muted">Check out what you can do with this app theme!</p>
                  <hr />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="device-container">
                  <div className="device-mockup" data-device="macbook">
                    <div className="device">
                      <div className="screen">
                        {/*<!-- Demo image for screen mockup, you can put an image here, some HTML,
                          an animation, video, or anything else! -->*/}
                        <img src={image} className="img-responsive" alt="" /> </div>
                      <div className="button">
                        {/*<!-- You can hook the "home button" to some JavaScript events or just remove it -->*/}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="feature-item">
                        <i className="icon-screen-smartphone text-primary"></i>
                        <h3>Device Mockups</h3>
                        <p className="text-muted">Ready to use HTML/CSS device mockups, no Photoshop required!</p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="feature-item">
                        <i className="icon-camera text-primary"></i>
                        <h3>Flexible Use</h3>
                        <p className="text-muted">Put an image, video, animation, or anything else in the screen!</p>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="feature-item">
                        <i className="icon-present text-primary"></i>
                        <h3>Free to Use</h3>
                        <p className="text-muted">As always, this theme is free to download and use for any purpose!</p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="feature-item">
                        <i className="icon-lock-open text-primary"></i>
                        <h3>Open Source</h3>
                        <p className="text-muted">Since this theme is MIT licensed, you can use it commercially!</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="cta">
          <div className="cta-content">
            <div className="container">
              <h2>Stop waiting.<br />Start building.</h2>
              <Link to="/register" className="btn btn-outline btn-xl page-scroll">Let's Get Started!</Link>
            </div>
          </div>
          <div className="overlay"></div>
        </section>

        <section id="contact" className="contact bg-primary">
          <div className="container">
            <h2>We <i className="icon-heart"></i> new friends!</h2>
            <ul className="list-inline list-social">
              <li className="social-twitter">
                <a href="#"><i className="icon-social-twitter"></i></a>
              </li>
              <li className="social-facebook">
                <a href="#"><i className="icon-social-facebook"></i></a>
              </li>
              <li className="social-google-plus">
                <a href="#"><i className="icon-social-google"></i></a>
              </li>
            </ul>
          </div>
        </section>

        <footer>
          <div className="container">
            <p>&copy; 2017 Wallet Cat. All Rights Reserved.</p>
            <ul className="list-inline">
              <li>
                <Link to="/privacy-policy">Privacy</Link>
              </li>
              <li>
                <Link to="/terms-of-service">Terms</Link>
              </li>
              <li>
                <a href="#">FAQ</a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    )
  }
}

export default Home
