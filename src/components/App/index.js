import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { push } from 'react-router-redux'
import { Header, AppAlertList, Footer } from '..'
import Landing from '../Landing'

import './style.less'

export class App extends Component {
  componentDidUpdate(prevProps) {
    const { dispatch, redirectUrl, isAuthenticated } = this.props
    const isLoggingIn = !prevProps.isAuthenticated && isAuthenticated

    if (isLoggingIn) {
      dispatch(push(redirectUrl))
    }
  }

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
  }),
  isAuthenticated: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  redirectUrl: PropTypes.string
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated || false,
    redirectUrl: state.auth.redirectUrl
  }
}

export default connect(mapStateToProps)(withRouter(App))
