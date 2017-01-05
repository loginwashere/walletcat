import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'
import transactions from './transactions';
import currencies from './currencies';
import auth from './auth';
import alerts from './alerts';
import userCurrencies from './userCurrencies';
import categories from './categories';
import accounts from './accounts';

export default combineReducers({
  alerts,
  auth,
  currencies,
  userCurrencies,
  categories,
  accounts,
  transactions,
  routing: routerReducer,
  form: formReducer
});
