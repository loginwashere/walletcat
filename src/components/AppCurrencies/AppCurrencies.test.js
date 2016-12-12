import React from 'react';
import ReactDOM from 'react-dom';
import AppCurrencies from './AppCurrencies';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppCurrencies />, div);
});
