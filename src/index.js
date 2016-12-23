import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import axios from 'axios';
import routes from './routes';
import store from './store';
import { logoutUser } from './actions';

// Add a response interceptor
axios.interceptors.response.use(
  response => {
    console.log(response);
    return response;
  },
  error => {
    console.log(error, error.response.status, store.dispatch);
    if (error.response.status === 401) {
      logoutUser()(store.dispatch);
    }
    return Promise.reject(error);
  }
);

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      {routes()}
    </Router>
  </Provider>,
  document.getElementById('root')
);
