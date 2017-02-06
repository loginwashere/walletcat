import React from 'react'
import ReactTestUtils from 'react-addons-test-utils'
import { reduxForm } from 'redux-form'
import { Provider } from 'react-redux'
import configureStore from '../../configureStore'
import { AccountFormFields } from '.'

const spy = jest.fn()
const AccountFormFieldsDecorated = reduxForm({ form: 'test-form' })(AccountFormFields)
it('renders without crashing', () => {
  const store = configureStore()
  ReactTestUtils.renderIntoDocument(
    <Provider store={store}>
      <AccountFormFieldsDecorated type={'create'}
                                  loadUserCurrenciesOptions={spy}
                                  loadAgentsOptions={spy} />
    </Provider>
  )
})
