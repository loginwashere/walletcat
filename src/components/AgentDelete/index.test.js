import React from 'react'
import renderer from 'react-test-renderer'
import { AgentDelete } from '.'
import { agentSeeder } from '../../../server/seeds'

describe('components:AgentDelete:', () => {
  const dispatch = jest.fn()
  const agentId = agentSeeder.items[0].id
  it('renders without crashing', () => {
    const tree = renderer.create(
      <AgentDelete dispatch={dispatch}
                   agentId={agentId} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
    expect(dispatch.mock.calls.length).toBe(1)
  })
})
