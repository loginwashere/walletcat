import React from 'react'
import ReactTestUtils from 'react-addons-test-utils'
import { Provider } from 'react-redux'
import configureStore from '../../configureStore'
import { TransactionCreate } from '.'

describe('components:TransactionCreate:', () => {
  it('renders without crashing', () => {
    const store = configureStore()
    const dispatch = jest.fn()
    const currentPage = 1
    ReactTestUtils.renderIntoDocument(
      <Provider store={store}>
        <TransactionCreate dispatch={dispatch}
                           currentPage={currentPage} />
      </Provider>
    )
  })
})
