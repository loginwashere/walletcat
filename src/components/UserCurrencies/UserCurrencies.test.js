import React from 'react';
import ReactDOM from 'react-dom';
import { UserCurrencies } from './UserCurrencies';
import store from '../../store';

it('renders without crashing', () => {
  const currencies = [
    {
      id: 1,
      name: 'USD'
    }
  ];
  const userCurrencies = [
    {
      id: 1,
      userId: 1,
      currencyId: 1
    }
  ];
  const div = document.createElement('div');
  ReactDOM.render(<UserCurrencies currencies={currencies}
                                  userCurrencies={userCurrencies}
                                  dispatch={store.dispatch} />, div);
});
