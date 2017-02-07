import React from 'react'
import renderer from 'react-test-renderer'
import Agent from '.'
import { agentSeeder } from '../../../server/seeds'

describe('components:Agent:', () => {
  const agent = agentSeeder.items[0]

  it('renders without crashing', () => {
    const tree = renderer.create(
      <Agent agent={agent} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
