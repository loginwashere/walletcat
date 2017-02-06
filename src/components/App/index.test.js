import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import { App } from '.'
import configureStore from '../../configureStore'

it('renders without crashing', () => {
  const store = configureStore()
  const tree = renderer.create(
    <Provider store={store} >
      <App dispatch={store.dispatch}
           isAuthenticated={false}
           location={{ pathname: '/sign-in' }} />
    </Provider>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders landing without crashing', () => {
  const store = configureStore()
  const div = document.createElement('div')
  document.body.appendChild(div)
  ReactDOM.render(
    <Provider store={store} >
      <App dispatch={store.dispatch}
           isAuthenticated={false}
           location={{ pathname: '/' }} />
    </Provider>,
    div
  )
})
