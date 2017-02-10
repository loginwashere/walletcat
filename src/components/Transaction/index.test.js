import React from 'react'
import renderer from 'react-test-renderer'
import Transaction from '.'
import {
  transactionSeeder,
  transactionItemSeeder,
  categorySeeder,
  accountSeeder,
  userCurrencySeeder,
  currencySeeder
} from '../../../server/seeds'

describe('components:Transaction:', () => {
  it('renders without crashing', () => {
    const transaction = transactionSeeder.items[0]
    const transactionItems = transactionItemSeeder.items
      .reduce((obj, item) => ({ ...obj, [item.id]: item }), {})
    const testTransaction = {
      ...transaction,
      transactionItems: Object.keys(transactionItems)
        .filter(transactionItemId => transactionItems[transactionItemId].transactionId === transaction.id)
    }
    const category = categorySeeder.items.filter(item => item.id === transaction.categoryId)[0]
    const accounts = accountSeeder.items
      .reduce((obj, item) => ({ ...obj, [item.id]: item }), {})
    const userCurrencies = userCurrencySeeder.items
      .reduce((obj, item) => ({ ...obj, [item.id]: item }), {})
    const currencies = currencySeeder.items
      .reduce((obj, item) => ({ ...obj, [item.id]: item }), {})

    const tree = renderer.create(
      <Transaction transaction={testTransaction}
                   accounts={accounts}
                   transactionItems={transactionItems}
                   userCurrencies={userCurrencies}
                   currencies={currencies}
                   category={category} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
