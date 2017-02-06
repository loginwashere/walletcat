import React from 'react'
import ReactDOM from 'react-dom'
import { AgentView } from '.'
import configureStore from '../../configureStore'
import { agentSeeder } from '../../../server/seeds'

it('renders without crashing', () => {
  const div = document.createElement('div')
  const store = configureStore()
  const agentId = agentSeeder.items[0].id
  ReactDOM.render(<AgentView dispatch={store.dispatch}
                             agentId={agentId} />, div)
})
