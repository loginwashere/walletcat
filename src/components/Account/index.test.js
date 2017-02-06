import React from 'react'
import ReactDOM from 'react-dom'
import Account from '.'
import { accountSeeder, userCurrencySeeder, currencySeeder } from '../../../server/seeds'

it('renders without crashing', () => {
  const account = accountSeeder.items[0]
  const userCurrency = userCurrencySeeder.items.filter(item => item.id === account.currencyId)[0]
  const currency = currencySeeder.items.filter(item => item.id === userCurrency.currencyId)[0]
  const div = document.createElement('div')
  ReactDOM.render(<Account account={account}
                           accountCurrency={currency} />, div)
})