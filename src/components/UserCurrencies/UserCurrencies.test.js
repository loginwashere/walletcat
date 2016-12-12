import React from 'react';
import ReactDOM from 'react-dom';
import UserCurrencies from './UserCurrencies';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UserCurrencies />, div);
});
