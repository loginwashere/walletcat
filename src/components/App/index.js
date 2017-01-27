import React, { Component, PropTypes } from 'react'
import { withRouter } from 'react-router'
import { Header, AppAlertList, Footer } from '..'
import Landing from '../Landing'

import './style.less'

export class App extends Component {
  render() {
    return this.props.location.pathname !== '/'
      ? <div>
          <Header />
          <div className="appContent container">
            <AppAlertList />
            {this.props.children}
          </div>
          <Footer />
        </div>
      : <Landing />
  }
}

App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  location: PropTypes.shape({
    pathname: PropTypes.string
  })
}

export default withRouter(App)
