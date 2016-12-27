import React from 'react';
import ReactDOM from 'react-dom';
import Transaction from './Transaction';

it('renders without crashing', () => {
  const transaction = {
    id: 1,
    name: 'test',
    description: 'test',
    date: '',
    fromAmount: 100,
    toAmount: 100
  }
  const fromAccount = {
    id: 1,
    name: 'Stash'
  }
  const toAccount = {
    id: 2,
    name: 'Wallet'
  }
  const category = {
    id: 1,
    name: 'test'
  }

  const div = document.createElement('div');
  ReactDOM.render(<Transaction transaction={transaction}
                               fromAccount={fromAccount}
                               toAccount={toAccount}
                               category={category} />, div);
});
