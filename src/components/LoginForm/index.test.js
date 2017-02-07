import React from 'react'
import { Provider } from 'react-redux'
import { reduxForm } from 'redux-form'
import configureStore from '../../configureStore'
import renderer from 'react-test-renderer'
import { LoginForm } from '.'

describe('components:Login:', () => {
  it('renders without crashing', () => {
    const LoginFormDecorated = reduxForm({ form: 'testForm' })(LoginForm)
    const store = configureStore()
    const dispatch = jest.fn()
    const handleSubmit = jest.fn()
    const tree = renderer.create(
      <Provider store={store}>
        <LoginFormDecorated dispatch={dispatch}
                            handleSubmit={handleSubmit}
                            submitting={false}
                            pristine={true}
                            invalid={false} />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
