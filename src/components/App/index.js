import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { HeaderConnected, AppAlertListConnected, Footer } from '..'
import Landing from '../Landing'

import './style.less'

export class App extends Component {
  render() {
    return this.props.location.pathname !== '/'
      ? <div>
          <HeaderConnected />
          <div className="appContent container">
            <AppAlertListConnected />
            {this.props.children}
          </div>
          <Footer />
        </div>
      : <Landing />
  }
}

App = withRouter(App)

export default App
