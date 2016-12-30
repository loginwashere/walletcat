import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import middleware from './middleware';

export default createStore(
  reducers,
  applyMiddleware(...middleware)
);
