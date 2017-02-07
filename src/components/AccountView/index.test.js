import React from 'react'
import ReactTestUtils from 'react-addons-test-utils'
import { AccountView } from '.'
import { accountSeeder } from '../../../server/seeds'

describe('components:AccountView:', () => {
  const shallowRenderer = ReactTestUtils.createRenderer()

  const dispatch = jest.fn()
  const account = accountSeeder.items[0]

  it('renders without crashing', () => {
    shallowRenderer.render(
      <AccountView dispatch={dispatch}
                   accountId={account.id}
                   account={account} />
    )
  })
})

