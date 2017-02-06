import React from 'react'
import ReactDOM from 'react-dom'
import Transaction from '.'
import {
  transactionSeeder,
  categorySeeder,
  accountSeeder,
  userCurrencySeeder,
  currencySeeder
} from '../../../server/seeds'

it('renders without crashing', () => {
  const transaction = transactionSeeder.items[0]
  const category = categorySeeder.items.filter(item => item.id === transaction.categoryId)[0]
  const fromAccount = accountSeeder.items.filter(item => item.id === transaction.fromAccountId)[0]
  const toAccount = accountSeeder.items.filter(item => item.id === transaction.toAccountId)[0]
  const fromAccountUserCurrency = userCurrencySeeder.items.filter(item => item.id === fromAccount.currencyId)[0]
  const toAccountUserCurrency = userCurrencySeeder.items.filter(item => item.id === toAccount.currencyId)[0]
  const fromAccountCurrency = currencySeeder.items.filter(item => item.id === fromAccountUserCurrency.currencyId)[0]
  const toAccountCurrency = currencySeeder.items.filter(item => item.id === toAccountUserCurrency.currencyId)[0]

  const div = document.createElement('div')
  ReactDOM.render(<Transaction transaction={transaction}
                               fromAccount={fromAccount}
                               fromAccountCurrency={fromAccountCurrency}
                               toAccount={toAccount}
                               toAccountCurrency={toAccountCurrency}
                               category={category} />, div)
})
