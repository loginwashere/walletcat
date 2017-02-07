import React from 'react'
import renderer from 'react-test-renderer'
import { transactionSeeder } from '../../../server/seeds'
import { TransactionDelete } from '.'

describe('components:Login:', () => {
  it('renders without crashing and without transaction data', () => {
    const dispatch = jest.fn()
    const transaction = transactionSeeder.items[0]
    const tree = renderer.create(
        <TransactionDelete dispatch={dispatch}
                           transactionId={transaction.id} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders without crashing and with transaction data', () => {
    const dispatch = jest.fn()
    const transaction = transactionSeeder.items[0]
    const tree = renderer.create(
        <TransactionDelete dispatch={dispatch}
                           transactionId={transaction.id}
                           transaction={transaction} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
