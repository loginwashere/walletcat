import React, { PropTypes } from 'react';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import IdleTimer from 'react-idle-timer';
import jwtDecode from 'jwt-decode';
import routes from '../../routes';
import { logoutUser } from '../../actions';

const Root = ({ store }) => {
  const history = syncHistoryWithStore(browserHistory, store);
  const IDLE_TIMEOUT = 5000;
  const handleIdle = () => {
    const token = localStorage.getItem('token');
    const decodedToken = token && jwtDecode(token);
    const state = store.getState();
    state.auth
    && state.auth.isAuthenticated
    && decodedToken
    && decodedToken.exp * 1000 < Date.now()
    && logoutUser()(store.dispatch)
  };
  return (
    <Provider store={store}>
      <IdleTimer idleAction={handleIdle}
                 timeout={IDLE_TIMEOUT} >
        <Router history={history}>
          {routes()}
        </Router>
      </IdleTimer>
    </Provider>
  );
};

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root;