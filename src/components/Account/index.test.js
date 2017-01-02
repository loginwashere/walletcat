import React from 'react';
import ReactDOM from 'react-dom';
import Account from '.';

it('renders without crashing', () => {
  const account = {
    id: 1,
    name: 'Wallet',
    amount: 0
  }
  const accountCurrency = {
    id: 1,
    name: 'USD'
  }
  const div = document.createElement('div');
  ReactDOM.render(<Account account={account}
                           accountCurrency={accountCurrency} />, div);
});