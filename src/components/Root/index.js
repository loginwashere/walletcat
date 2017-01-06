import React from 'react';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import routes from '../../routes';

const Root = ({ store }) => {
  const history = syncHistoryWithStore(browserHistory, store);
  return <Provider store={store}>
    <Router history={history}>
      {routes()}
    </Router>
  </Provider>
};

export default Root;