import React from 'react'
import renderer from 'react-test-renderer'
import { reduxForm } from 'redux-form'
import { Provider } from 'react-redux'
import { AgentEditForm } from '.'
import { agentSeeder } from '../../../server/seeds'
import configureStore from '../../configureStore'

describe('components:AgentEditForm:', () => {
  const AgentEditFormDecorated = reduxForm({ form: 'test-form' })(AgentEditForm)

  it('renders without crashing', () => {
    const store = configureStore()
    const tree = renderer.create(
      <Provider store={store} >
        <AgentEditFormDecorated agent={agentSeeder.items[0]} />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
