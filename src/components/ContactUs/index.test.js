import React from 'react'
import renderer from 'react-test-renderer'
import ContactUs from '.'

describe('components:ContactUs:', () => {
  it('renders without crashing', () => {
    const tree = renderer.create(
      <ContactUs />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
