import React from 'react'
import renderer from 'react-test-renderer'
import { agentSeeder } from '../../../server/seeds'
import AgentsPage from '.'

describe('components:AgentsPage:', () => {
  const agent = agentSeeder.items[0]
  const agents = { [agent.id]: agent }
  const agentIds = [agent.id]

  it('renders without crashing', () => {
    const tree = renderer.create(
      <AgentsPage agentIds={agentIds}
                  agents={agents} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders without crashing without agent elements', () => {
    const agents = {}
    const tree = renderer.create(
      <AgentsPage agentIds={agentIds}
                  agents={agents} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

