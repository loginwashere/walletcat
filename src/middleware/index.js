import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';

const middleware = [ thunk, routerMiddleware(browserHistory) ];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

export default middleware;