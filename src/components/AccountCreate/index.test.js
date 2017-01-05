import React from 'react';
import ReactDOM from 'react-dom';
import { AccountCreate } from '.';
import store from '../../store';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const currencies = {
    '1': {
      id: 1,
      name: 'USD'
    }
  };
  const userCurrencies = {
   '1': {
      id: 1,
      currencyId: 1,
      userId: 1
    }
  };
  const userCurrencyIds = [1];
  ReactDOM.render(<AccountCreate currencies={currencies}
                                 userCurrencies={userCurrencies}
                                 userCurrencyIds={userCurrencyIds}
                                 dispatch={store.dispatch} />, div);
});