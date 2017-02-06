import React from 'react'
import ReactDOM from 'react-dom'
import AgentsPage from '.'
import { agentSeeder } from '../../../server/seeds'

it('renders without crashing', () => {
  const div = document.createElement('div')
  const agent = agentSeeder.items[0]
  const agents = { [agent.id]: agent }
  ReactDOM.render(<AgentsPage agents={agents}/>, div)
})
