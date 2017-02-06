import React from 'react'
import ReactDOM from 'react-dom'
import Agent from '.'
import { agentSeeder } from '../../../server/seeds'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Agent agent={agentSeeder.items[0]} />, div)
})
