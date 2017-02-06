import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import AccountCreate from '.'
import configureStore from '../../configureStore'

describe('components:AccountCreate:', () => {
  const dispatch = jest.fn()
  it('renders without crashing', () => {
    const store = configureStore()
    const div = document.createElement('div')
    ReactDOM.render(
      <Provider store={store}>
        <AccountCreate dispatch={dispatch} />
      </Provider>,
      div
    )
  })
})