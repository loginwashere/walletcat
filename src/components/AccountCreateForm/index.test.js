import React from 'react'
import ReactTestUtils from 'react-addons-test-utils'
import { AccountCreateForm } from '.'

describe('components:AccountCreateForm:', () => {
  const shallowRenderer = ReactTestUtils.createRenderer()

  it('renders without crashing', () => {
    const dispatch = jest.fn()
    const handleSubmit = jest.fn()
    const reset = jest.fn()
    const currentPage = 1
    shallowRenderer.render(
      <AccountCreateForm dispatch={dispatch}
                         handleSubmit={handleSubmit}
                         submitting={false}
                         pristine={true}
                         invalid={false}
                         reset={reset}
                         currentPage={currentPage} />
    )
  })
})
