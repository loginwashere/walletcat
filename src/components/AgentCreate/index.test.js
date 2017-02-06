import React from 'react'
import renderer from 'react-test-renderer'
import { AgentCreate } from '.'
import { Provider } from 'react-redux'
import configureStore from '../../configureStore'

describe('components:AgentCreate:', () => {
  const dispatch = jest.fn()

  it('renders without crashing', () => {
    const store = configureStore()
    const tree = renderer.create(
      <Provider store={store}>
        <AgentCreate dispatch={dispatch} />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
