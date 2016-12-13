import React from 'react';
import ReactDOM from 'react-dom';
import AppCurrency from './AppCurrency';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const currency = {
    id: 1,
    name: 'test',
    description: 'trest'
  };
  ReactDOM.render(<AppCurrency currency={currency} />, div);
});