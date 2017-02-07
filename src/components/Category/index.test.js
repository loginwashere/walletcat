import React from 'react'
import renderer from 'react-test-renderer'
import { categorySeeder } from '../../../server/seeds'
import Category from '.'

describe('components:Category:', () => {
  it('renders without crashing', () => {
    const category = categorySeeder.items[0]
    const tree = renderer.create(
      <Category category={category} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

