import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { reduxForm } from 'redux-form'
import { Provider } from 'react-redux'
import AgentFormFields from '.'
import configureStore from '../../configureStore'

const AgentFormFieldsDecorated = reduxForm({ form: 'test-form' })(AgentFormFields)
it('renders without crashing', () => {
  const store = configureStore()
  const tree = renderer.create(
    <Provider store={store} >
      <AgentFormFieldsDecorated />
    </Provider>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
