import React from 'react';
import ReactDOM from 'react-dom';
import { AccountCreate } from '.';
import store from '../../store';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const currencies = [
    {
      id: 1,
      name: 'USD'
    }
  ];
  const userCurrencies = [
    {
      id: 1,
      currencyId: 1,
      userId: 1
    }
  ];
  ReactDOM.render(<AccountCreate currencies={currencies}
                                 userCurrencies={userCurrencies}
                                 dispatch={store.dispatch} />, div);
});