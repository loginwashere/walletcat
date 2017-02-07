import React from 'react'
import renderer from 'react-test-renderer'
import Home from '.'

describe('components:Home:', () => {
  it('renders without crashing', () => {
    const tree = renderer.create(
      <Home />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

