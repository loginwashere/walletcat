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
  const currencies = [ currency ];
  const userCurrencies = [];
  ReactDOM.render(<AppCurrencies currencies={currencies}
                                 userCurrencies={userCurrencies}
                                 dispatch={store.dispatch} />, div);
});
