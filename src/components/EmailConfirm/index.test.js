import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import configureStore from '../../configureStore'
import { EmailConfirm } from '.'

describe('components:EmailConfirm:', () => {
  it('renders without crashing', () => {
    const store = configureStore()
    const dispatch = jest.fn()
    const code = 'test'
    const tree = renderer.create(
      <Provider store={store}>
        <EmailConfirm dispatch={dispatch}
                      isEmailConfirmed={false}
                      isEmailConfirmResent={false}
                      isFetching={false}
                      code={code} />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
