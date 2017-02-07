import React from 'react'
import ReactTestUtils from 'react-addons-test-utils'
import { accountSeeder } from '../../../server/seeds'
import { AccountEditForm } from '.'

describe('components:AccountEditForm:', () => {
  const shallowRenderer = ReactTestUtils.createRenderer()

  const dispatch = jest.fn()
  const handleSubmit = jest.fn()
  const reset = jest.fn()
  const account = accountSeeder.items[0]

  it('renders without crashing', () => {
    shallowRenderer.render(
      <AccountEditForm account={account}
                       dispatch={dispatch}
                       handleSubmit={handleSubmit}
                       submitting={false}
                       pristine={true}
                       invalid={false}
                       reset={reset} />
    )
  })
})
