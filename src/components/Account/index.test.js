import React from 'react'
import ReactDOM from 'react-dom'
import { v4 } from 'uuid'
import Account from '.'

it('renders without crashing', () => {
  const accountCurrency = {
    id: v4(),
    name: 'USD'
  }
  const account = {
    id: v4(),
    name: 'Wallet',
    amount: 0,
    currencyId: accountCurrency.id
  }
  const div = document.createElement('div')
  ReactDOM.render(<Account account={account}
                           accountCurrency={accountCurrency} />, div)
})