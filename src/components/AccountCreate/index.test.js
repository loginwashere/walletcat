import React from 'react'
import ReactTestUtils from 'react-addons-test-utils'
import { AccountCreate } from '.'

describe('components:AccountCreate:', () => {
  const shallowRenderer = ReactTestUtils.createRenderer()
  const dispatch = jest.fn()
  it('renders without crashing', () => {
    shallowRenderer.render(
      <AccountCreate dispatch={dispatch} />
    )
  })
})
