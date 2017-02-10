import React from 'react'
import ReactTestUtils from 'react-addons-test-utils'
import { AccountCreate } from '.'

describe('components:AccountCreate:', () => {
  const shallowRenderer = ReactTestUtils.createRenderer()
  it('renders without crashing', () => {
    const dispatch = jest.fn()
    const currentPage = 1
    shallowRenderer.render(
      <AccountCreate dispatch={dispatch}
                     currentPage={currentPage} />
    )
  })
})
