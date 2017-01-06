import React from 'react';
import ReactDOM from 'react-dom';
import { Accounts } from '.';
import configureStore from '../../configureStore';

it('renders without crashing', () => {
  const store = configureStore();
  const accounts = {
    '1': {
      id: 1,
      name: 'Wallet',
      amount: 0
    }
  };
  const accountIds = [1];
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
  const userCurrenciesIdsByCurrencyId = {'1': '1'};
  const div = document.createElement('div');
  ReactDOM.render(<Accounts accounts={accounts}
                            accountIds={accountIds}
                            currencies={currencies}
                            userCurrencies={userCurrencies}
                            userCurrenciesIdsByCurrencyId={userCurrenciesIdsByCurrencyId}
                            dispatch={store.dispatch} />, div);
});
