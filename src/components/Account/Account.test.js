import React from 'react';
import ReactDOM from 'react-dom';
import Account from './Account';

it('renders without crashing', () => {
  const account = {
    id: 1,
    name: 'Wallet'
  }
  const div = document.createElement('div');
  ReactDOM.render(<Account account={account} />, div);
});