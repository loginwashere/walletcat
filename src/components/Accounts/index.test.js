import React from 'react';
import ReactDOM from 'react-dom';
import { Accounts } from '.';
import store from '../../store';

it('renders without crashing', () => {
  const accounts = [
    {
      id: 1,
      name: 'Wallet'
    }
  ];
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
  const div = document.createElement('div');
  ReactDOM.render(<Accounts accounts={accounts}
                            currencies={currencies}
                            userCurrencies={userCurrencies}
                            dispatch={store.dispatch} />, div);
});
