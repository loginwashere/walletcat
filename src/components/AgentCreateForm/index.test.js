import React from 'react'
import ReactDOM from 'react-dom'
import AgentCreateForm from '.'
import { Provider } from 'react-redux'
import configureStore from '../../configureStore'

it('renders without crashing', () => {
  const div = document.createElement('div')
  const store = configureStore()
  ReactDOM.render(
    <Provider store={store}>
      <AgentCreateForm />
    </Provider>, div)
})