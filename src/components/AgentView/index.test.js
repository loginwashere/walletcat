import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import configureStore from '../../configureStore'
import { agentSeeder } from '../../../server/seeds'
import { AgentView } from '.'

describe('components:AgentView:', () => {
  const agent = agentSeeder.items[0]
  const agentId = agent.id
  const store = configureStore()

  it('renders without crashing', () => {
    const dispatch = jest.fn()
    const tree = renderer.create(
      <Provider store={store}>
        <AgentView agentId={agentId}
                   agent={agent}
                   dispatch={dispatch} />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
    expect(dispatch.mock.calls.length).toBe(1)
  })

  it('renders without crashing without agent elements', () => {
    const dispatch = jest.fn()
    const tree = renderer.create(
      <AgentView agentId={agentId}
                 dispatch={dispatch} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
    expect(dispatch.mock.calls.length).toBe(1)
  })
})
