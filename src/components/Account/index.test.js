import React from 'react'
import renderer from 'react-test-renderer'
import Account from '.'
import {
  accountSeeder,
  userCurrencySeeder,
  currencySeeder
} from '../../../server/seeds'

describe('components:Account:', () => {
  const account = accountSeeder.items[0]
  const userCurrency = userCurrencySeeder.items
    .filter(item => item.id === account.currencyId)[0]
  const currency = currencySeeder.items
    .filter(item => item.id === userCurrency.currencyId)[0]

  it('renders without crashing', () => {
    const tree = renderer.create(
      <Account account={account}
               accountCurrency={currency} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
