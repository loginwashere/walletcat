import React from 'react';
import ReactDOM from 'react-dom';
import Transaction from '.';

it('renders without crashing', () => {
  const transaction = {
    id: 1,
    description: 'test',
    date: '',
    fromAmount: 100,
    toAmount: 100
  }
  const fromAccount = {
    id: 1,
    name: 'Stash'
  }
  const fromAccountCurrency = {
    id: 1,
    name: 'USD'
  }
  const toAccount = {
    id: 2,
    name: 'Wallet'
  }
  const toAccountCurrency = {
    id: 1,
    name: 'USD'
  }
  const category = {
    id: 1,
    name: 'test'
  }

  const div = document.createElement('div');
  ReactDOM.render(<Transaction transaction={transaction}
                               fromAccount={fromAccount}
                               fromAccountCurrency={fromAccountCurrency}
                               toAccount={toAccount}
                               toAccountCurrency={toAccountCurrency}
                               category={category} />, div);
});
