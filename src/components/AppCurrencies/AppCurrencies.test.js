import React from 'react';
import ReactDOM from 'react-dom';
import { AppCurrencies } from './AppCurrencies';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const currency = {
    id: 1,
    name: 'test',
    description: 'trest'
  };
  const currencies = [ currency ];
  ReactDOM.render(<AppCurrencies currencies={currencies}
                                 dispatch={() => {}} />, div);
});
