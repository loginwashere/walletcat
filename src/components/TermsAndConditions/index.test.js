import React from 'react'
import renderer from 'react-test-renderer'
import TermsAndConditions from '.'

describe('components:TermsAndConditions:', () => {
  it('renders without crashing', () => {
    const tree = renderer.create(
      <TermsAndConditions />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

