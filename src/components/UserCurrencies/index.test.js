import React from 'react';
import ReactDOM from 'react-dom';
import { v4 } from 'uuid';
import { UserCurrencies } from '.';
import configureStore from '../../configureStore';

it('renders without crashing', () => {
  const store = configureStore();
  const currency = {
    id: v4(),
    name: 'USD'
  };
  const currencies = {
    [currency.id]: currency
  };
  const userCurrency = {
    id: v4(),
    userId: v4(),
    currencyId: v4()
  };
  const userCurrencyIds = [userCurrency.id];
  const userCurrencies = {
    [userCurrency.id]: userCurrency
  };
  const div = document.createElement('div');
  ReactDOM.render(<UserCurrencies currencies={currencies}
                                  userCurrencyIds={userCurrencyIds}
                                  userCurrencies={userCurrencies}
                                  dispatch={store.dispatch} />, div);
});
