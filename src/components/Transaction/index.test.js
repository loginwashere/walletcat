import React from 'react';
import ReactDOM from 'react-dom';
import { v4 } from 'uuid';
import Transaction from '.';

it('renders without crashing', () => {

  const fromAccountCurrency = {
    id: v4(),
    name: 'USD'
  }
  const fromAccount = {
    id: v4(),
    name: 'Stash',
    currencyId: fromAccountCurrency.id
  }
  const toAccountCurrency = {
    id: v4(),
    name: 'USD'
  }
  const toAccount = {
    id: v4(),
    name: 'Wallet',
    currencyId: toAccountCurrency.id
  }
  const category = {
    id: v4(),
    name: 'test'
  }
  const transaction = {
    id: v4(),
    description: 'test',
    date: '',
    fromAmount: 100,
    fromAccountId: fromAccount.id,
    toAmount: 100,
    toAccountId: toAccount.id,
    categoryId: category.id
  }

  const div = document.createElement('div');
  ReactDOM.render(<Transaction transaction={transaction}
                               fromAccount={fromAccount}
                               fromAccountCurrency={fromAccountCurrency}
                               toAccount={toAccount}
                               toAccountCurrency={toAccountCurrency}
                               category={category} />, div);
});
