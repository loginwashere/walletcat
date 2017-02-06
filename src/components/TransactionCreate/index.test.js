import React from 'react'
import ReactTestUtils from 'react-addons-test-utils'
import { Provider } from 'react-redux'
import configureStore from '../../configureStore'
import { TransactionCreate } from '.'

it('renders without crashing', () => {
  const store = configureStore()
  ReactTestUtils.renderIntoDocument(
    <Provider store={store}>
      <TransactionCreate dispatch={store.dispatch} />
    </Provider>
  )
})
