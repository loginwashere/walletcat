import React from 'react'
import ReactDOM from 'react-dom'
import AgentCreate from '.'
import { Provider } from 'react-redux'
import configureStore from '../../configureStore'

it('renders without crashing', () => {
  const store = configureStore()
  const div = document.createElement('div')
  ReactDOM.render(
    <Provider store={store}>
      <AgentCreate />
    </Provider>,
    div
  )
})
