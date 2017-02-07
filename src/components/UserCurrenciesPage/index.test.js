import React from 'react'
import renderer from 'react-test-renderer'
import {
  userCurrencySeeder,
  currencySeeder
} from '../../../server/seeds'
import UserCurrenciesPage from '.'

describe('components:Login:', () => {
  it('renders without crashing and without required data', () => {
    const dispatch = jest.fn()
    const userCurrency = userCurrencySeeder.items[0]
    const currency = currencySeeder.items[0]
    const currencies = { [currency.id]: currency }
    const userCurrencies = { [userCurrency.id]: userCurrency }
    const tree = renderer.create(
        <UserCurrenciesPage dispatch={dispatch}
                            userCurrencies={userCurrencies}
                            currencies={currencies} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders without crashing and with required data', () => {
    const dispatch = jest.fn()
    const userCurrency = userCurrencySeeder.items[0]
    const currency = currencySeeder.items[0]
    const currencies = { [currency.id]: currency }
    const userCurrencies = { [userCurrency.id]: userCurrency }
    const userCurrencyIds = [userCurrency.id]
    const tree = renderer.create(
        <UserCurrenciesPage dispatch={dispatch}
                            userCurrencyIds={userCurrencyIds}
                            userCurrencies={userCurrencies}
                            currencies={currencies} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})