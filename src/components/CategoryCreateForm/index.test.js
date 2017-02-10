import React from 'react'
import { reduxForm } from 'redux-form'
import renderer from 'react-test-renderer'
import { CategoryCreateForm } from '.'
import configureStore from '../../configureStore'
import { Provider } from 'react-redux'

const Decorated = reduxForm({ form: 'testForm' })(CategoryCreateForm)

describe('components:CategoryCreateForm:', () => {
  it('renders without crashing', () => {
    const store = configureStore()
    const dispatch = jest.fn()
    const handleSubmit = jest.fn()
    const currentPage = 1
    const tree = renderer.create(
      <Provider store={store} >
        <Decorated handleSubmit={handleSubmit}
                  submitting={false}
                  pristine={true}
                  invalid={false}
                  reset={dispatch}
                  currentPage={currentPage} />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
