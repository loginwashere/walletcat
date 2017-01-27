/* global document */

import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import configureStore from './configureStore'
import { logoutUser } from './actions'
import Root from './components/Root'

const store = configureStore()

// Add a response interceptor
axios.interceptors.response.use(
  undefined,
  error => {
    if (error.response.status === 401) {
      logoutUser()(store.dispatch)
    }
    return Promise.reject(error)
  }
)

if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install()
}

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
)
