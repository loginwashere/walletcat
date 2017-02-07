import React from 'react'
import renderer from 'react-test-renderer'
import {
  currencySeeder,
  userCurrencySeeder
} from '../../../server/seeds'
import { AppCurrencies } from '.'

describe('components:AppCurrencies:', () => {
  it('renders without crashing and without data', () => {
    const currency = currencySeeder.items[0]
    const currencies = { [currency.id]: currency }
    const currencyIds = [currency.id]
    const userCurrencies = {}
    const userCurrenciesIdsByCurrencyId = {}
    const dispatch = jest.fn()
    const tree = renderer.create(
      <AppCurrencies currencies={currencies}
                     currencyIds={currencyIds}
                     userCurrencies={userCurrencies}
                     userCurrenciesIdsByCurrencyId={userCurrenciesIdsByCurrencyId}
                     dispatch={dispatch} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders without crashing and with data', () => {
    const currency = currencySeeder.items[0]
    const currencies = { [currency.id]: currency }
    const currencyIds = [currency.id]
    const userCurrency = userCurrencySeeder.items[0]
    const userCurrencies = { [userCurrency.id]: userCurrency }
    const userCurrenciesIdsByCurrencyId = { [currency.id]: userCurrency.id }
    const page = 1
    const pages = { [page]: { ids: [currency.id] } }
    const dispatch = jest.fn()

    const tree = renderer.create(
      <AppCurrencies currencies={currencies}
                     currencyIds={currencyIds}
                     userCurrencies={userCurrencies}
                     userCurrenciesIdsByCurrencyId={userCurrenciesIdsByCurrencyId}
                     dispatch={dispatch}
                     page={page}
                     pages={pages} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

