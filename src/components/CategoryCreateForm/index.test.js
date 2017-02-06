import React from 'react'
import { reduxForm } from 'redux-form'
import renderer from 'react-test-renderer'
import { CategoryCreateForm } from '.'
import configureStore from '../../configureStore'
import { Provider } from 'react-redux'

const spy = jest.fn()

const Decorated = reduxForm({ form: 'testForm' })(CategoryCreateForm)
it('renders without crashing', () => {
  const store = configureStore()
  const tree = renderer.create(
    <Provider store={store} >
      <Decorated handleSubmit={spy}
                 submitting={false}
                 pristine={true}
                 invalid={false}
                 reset={spy} />
    </Provider>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
