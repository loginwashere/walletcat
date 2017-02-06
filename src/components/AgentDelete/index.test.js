import React from 'react'
import ReactDOM from 'react-dom'
import { AgentDelete } from '.'
import configureStore from '../../configureStore'
import { agentSeeder } from '../../../server/seeds'

it('renders without crashing', () => {
  const div = document.createElement('div')
  const store = configureStore()
  ReactDOM.render(<AgentDelete dispatch={store.dispatch}
                               agentId={agentSeeder.items[0].id} />, div)
})
