import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';

ReactDOM.render(
  <div>
    <Router history={browserHistory}>
      {routes()}
    </Router>
  </div>,
  document.getElementById('root')
);
