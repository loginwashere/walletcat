import React from 'react';
import ReactDOM from 'react-dom';
import { AppCurrencies } from '.';
import store from '../../store';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const currency = {
    id: 1,
    name: 'test',
    description: 'trest'
  };
  const currencies = {[currency.id]: currency };
  const currencyIds = [1];
  const userCurrencies = {};
  const userCurrenciesIdsByCurrencyId = {};
  ReactDOM.render(<AppCurrencies currencies={currencies}
                                 currencyIds={currencyIds}
                                 userCurrencies={userCurrencies}
                                 userCurrenciesIdsByCurrencyId={userCurrenciesIdsByCurrencyId}
                                 dispatch={store.dispatch} />, div);
});
