import React from 'react';
import ReactDOM from 'react-dom';
import { AccountCreateForm } from '.';
import configureStore from '../../configureStore';

it('renders without crashing', () => {
  const store = configureStore();
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
  ReactDOM.render(<AccountCreateForm currencies={currencies}
                                     userCurrencies={userCurrencies}
                                     userCurrencyIds={userCurrencyIds}
                                     dispatch={store.dispatch} />, div);
});