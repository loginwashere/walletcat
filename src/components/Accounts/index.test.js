import React from 'react'
import renderer from 'react-test-renderer'
import {
  accountSeeder,
  userCurrencySeeder,
  currencySeeder
} from '../../../server/seeds'
import { Accounts } from '.'

describe('components:Accounts:', () => {
  const dispatch = jest.fn()
  const page = 1
  const account = accountSeeder.items[0]
  const accounts = { [account.id]: account }
  const pages = { [page]: { ids: [account.id] } }
  const userCurrencies = userCurrencySeeder.items
    .reduce((result, current) => ({ ...result, [current.id]: current }), {})
  const currencies = currencySeeder.items
    .reduce((result, current) => ({ ...result, [current.id]: current }), {})

  it('renders without crashing', () => {
    const tree = renderer.create(
      <Accounts accounts={accounts}
                pages={pages}
                page={page}
                currencies={currencies}
                userCurrencies={userCurrencies}
                dispatch={dispatch} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
