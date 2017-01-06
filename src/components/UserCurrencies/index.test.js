import React from 'react';
import ReactDOM from 'react-dom';
import { UserCurrencies } from '.';
import configureStore from '../../configureStore';

it('renders without crashing', () => {
  const store = configureStore();
  const currencies = {
    '1': {
      id: 1,
      name: 'USD'
    }
  };
  const currencyIds = [1];
  const userCurrencies = {
    '1': {
      id: 1,
      userId: 1,
      currencyId: 1
    }
  };
  const userCurrenciesIdsByCurrencyId = {'1': '1'};
  const div = document.createElement('div');
  ReactDOM.render(<UserCurrencies currencies={currencies}
                                  currencyIds={currencyIds}
                                  userCurrencies={userCurrencies}
                                  userCurrenciesIdsByCurrencyId={userCurrenciesIdsByCurrencyId}
                                  dispatch={store.dispatch} />, div);
});
