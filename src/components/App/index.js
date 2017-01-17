import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { HeaderConnected, AppAlertListConnected, Footer, Home } from '..'

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
      : <Home />
  }
}

App = withRouter(App)

export default App
