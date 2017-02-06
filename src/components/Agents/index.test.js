import React from 'react'
import ReactDOM from 'react-dom'
import { Agents } from '.'
import configureStore from '../../configureStore'
import { agentSeeder } from '../../../server/seeds'

it('renders without crashing', () => {
  const div = document.createElement('div')
  const store = configureStore()
  const agent = agentSeeder.items[0]
  const agents = { [agent.id]: agent }
  ReactDOM.render(<Agents dispatch={store.dispatch}
                          agents={agents} />, div)
})
