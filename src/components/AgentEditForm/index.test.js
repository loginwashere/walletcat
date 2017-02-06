import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import AgentEditForm from '.'
import { agentSeeder } from '../../../server/seeds'
import configureStore from '../../configureStore'

it('renders without crashing', () => {
  const div = document.createElement('div')
  const store = configureStore()
  ReactDOM.render(
    <Provider store={store}>
      <AgentEditForm agent={agentSeeder.items[0]} />
    </Provider>,
    div
  )
})
