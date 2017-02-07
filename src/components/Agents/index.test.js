import React from 'react'
import renderer from 'react-test-renderer'
import { agentSeeder } from '../../../server/seeds'
import { Agents } from '.'

describe('components:Agents:', () => {
  const dispatch = jest.fn()
  const agent = agentSeeder.items[0]
  const agents = { [agent.id]: agent }
  const page = 1
  const pages = { [page]: { ids: [agent.id] } }

  it('renders without crashing', () => {
    const tree = renderer.create(
      <Agents dispatch={dispatch}
              agents={agents}
              page={page}
              pages={pages} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders without crashing without agent elements', () => {
    const agents = {}
    const tree = renderer.create(
      <Agents dispatch={dispatch}
              agents={agents}
              page={page}
              pages={pages} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
