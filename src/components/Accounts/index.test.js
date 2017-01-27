import React from 'react'
import ReactDOM from 'react-dom'
import { v4 } from 'uuid'
import { Accounts } from '.'
import configureStore from '../../configureStore'

it('renders without crashing', () => {
  const store = configureStore()
  const currency = {
    id: v4(),
    name: 'USD'
  }
  const currencies = {
    [currency.id]: currency
  }
  const userCurrency = {
    id: v4(),
    currencyId: currency.id,
    userId: v4()
  }
  const userCurrencies = {
    [userCurrency.id]: userCurrency
  }
  const account = {
    id: v4(),
    name: 'Wallet',
    currencyId: userCurrency.id,
    amount: 0
  }
  const accounts = {
    [account.id]: account
  }
  const accountIds = [account.id]
  const div = document.createElement('div')
  ReactDOM.render(<Accounts accounts={accounts}
                            accountIds={accountIds}
                            currencies={currencies}
                            userCurrencies={userCurrencies}
                            dispatch={store.dispatch} />, div)
})
