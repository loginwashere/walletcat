import React from 'react'
import ReactTestUtils from 'react-addons-test-utils'
import { AccountCreateForm } from '.'

const shallowRenderer = ReactTestUtils.createRenderer()
const spy = jest.fn()

it('renders without crashing', () => {
  shallowRenderer.render(
    <AccountCreateForm dispatch={spy}
                       handleSubmit={spy}
                       submitting={false}
                       pristine={true}
                       invalid={false}
                       reset={spy} />
  )
})
