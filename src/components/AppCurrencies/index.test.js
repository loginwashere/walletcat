import React from 'react';
import ReactDOM from 'react-dom';
import { v4 } from 'uuid';
import { AppCurrencies } from '.';
import configureStore from '../../configureStore';

it('renders without crashing', () => {
  const store = configureStore();
  const div = document.createElement('div');
  const currency = {
    id: v4(),
    name: 'test',
    description: 'trest'
  };
  const currencies = {[currency.id]: currency };
  const currencyIds = [currency.id];
  const userCurrencies = {};
  const userCurrenciesIdsByCurrencyId = {};
  ReactDOM.render(<AppCurrencies currencies={currencies}
                                 currencyIds={currencyIds}
                                 userCurrencies={userCurrencies}
                                 userCurrenciesIdsByCurrencyId={userCurrenciesIdsByCurrencyId}
                                 dispatch={store.dispatch} />, div);
});
