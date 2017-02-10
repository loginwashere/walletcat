import React from 'react'
import renderer from 'react-test-renderer'
import {
  transactionSeeder,
  transactionItemSeeder,
  accountSeeder,
  categorySeeder,
  currencySeeder,
  userCurrencySeeder
} from '../../../server/seeds'
import { Transactions } from '.'

describe('components:Transactions:', () => {
  it('renders without crashing and without transaction data', () => {
    const dispatch = jest.fn()
    const transactions = {}
    const transactionItems = {}
    const accounts = {}
    const categories = {}
    const currencies = {}
    const userCurrencies = {}
    const tree = renderer.create(
        <Transactions transactions={transactions}
                      transactionItems={transactionItems}
                      accounts={accounts}
                      categories={categories}
                      currencies={currencies}
                      userCurrencies={userCurrencies}
                      dispatch={dispatch} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders without crashing and with transaction data', () => {
    const dispatch = jest.fn()
    const transactionItems = transactionItemSeeder.itemsById
    const transactions = transactionSeeder.items
      .map(transaction => ({
        ...transaction,
        transactionItems: Object.keys(transactionItems)
          .map(transactionItemId => transactionItems[transactionItemId])
          .filter(transactionItem => transactionItem.transactionId === transaction.id)
          .map(transactionItem => transactionItem.id)
      }))
      .reduce((obj, item) => Object.assign({}, obj, { [item.id]: item }), {})
    const accounts = accountSeeder.itemsById
    const categories = categorySeeder.itemsById
    const currencies = currencySeeder.itemsById
    const userCurrencies = userCurrencySeeder.itemsById
    const page = 1
    const pages = { [page]: { ids: Object.keys(transactions) } }

    const tree = renderer.create(
        <Transactions transactions={transactions}
                      transactionItems={transactionItems}
                      accounts={accounts}
                      categories={categories}
                      currencies={currencies}
                      userCurrencies={userCurrencies}
                      dispatch={dispatch}
                      page={page}
                      pages={pages} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})