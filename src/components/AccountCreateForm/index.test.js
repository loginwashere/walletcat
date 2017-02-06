import React from 'react'
import ReactTestUtils from 'react-addons-test-utils'
import { AccountCreateForm } from '.'

describe('components:AccountCreateForm:', () => {
  const shallowRenderer = ReactTestUtils.createRenderer()

  const dispatch = jest.fn()
  const handleSubmit = jest.fn()
  const reset = jest.fn()

  it('renders without crashing', () => {
    shallowRenderer.render(
      <AccountCreateForm dispatch={dispatch}
                         handleSubmit={handleSubmit}
                         submitting={false}
                         pristine={true}
                         invalid={false}
                         reset={reset} />
    )
  })
})
