import React from 'react'
import renderer from 'react-test-renderer'
import AgentCreateForm from '.'
import { Provider } from 'react-redux'
import configureStore from '../../configureStore'

describe('components:AgentCreateForm:', () => {
  it('renders without crashing', () => {
    const store = configureStore()
    const tree = renderer.create(
      <Provider store={store}>
        <AgentCreateForm />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
