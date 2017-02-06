import React from 'react'
import renderer from 'react-test-renderer'
import About from '.'

describe('components:About:', () => {
  it('renders without crashing', () => {
    const tree = renderer.create(
      <About />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
