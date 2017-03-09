import React, { PropTypes } from 'react'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import { IntlProvider } from 'react-intl-redux'
import IdleTimer from 'react-idle-timer'
import routes from '../../routes'
import { logoutUser } from '../../actions'

const IDLE_TIMEOUT = 1000

const isTokenExpired = tokenExpirationDate =>
  tokenExpirationDate * 1000 < Date.now()

const handleIdle = store => () => {
  const state = store.getState()
  state.auth &&
  state.auth.isAuthenticated &&
  isTokenExpired(state.auth.tokenExpirationDate) &&
  logoutUser()(store.dispatch)
}

const Root = ({ store }) => (
  <Provider store={store}>
    <IntlProvider>
      <IdleTimer idleAction={handleIdle(store)}
                timeout={IDLE_TIMEOUT} >
        <Router history={syncHistoryWithStore(browserHistory, store)}>
          {routes()}
        </Router>
      </IdleTimer>
    </IntlProvider>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root
