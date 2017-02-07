import React from 'react'
import renderer from 'react-test-renderer'
import Footer from '.'

describe('components:Footer:', () => {
  it('renders without crashing', () => {
    const tree = renderer.create(
      <Footer />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
