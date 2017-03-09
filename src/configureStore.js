import { createStore, applyMiddleware, compose } from 'redux'
import reducers from './reducers'
import middleware from './middleware'
import { addLocaleData } from 'react-intl'
import { DEFAULT_LOCALE } from './config'
import localeMessages from './translations'

import enLocaleData from 'react-intl/locale-data/en'
import ruLocaleData from 'react-intl/locale-data/ru'
import ukLocaleData from 'react-intl/locale-data/uk'

addLocaleData(enLocaleData)
addLocaleData(ruLocaleData)
addLocaleData(ukLocaleData)

const locale = DEFAULT_LOCALE
const messages = localeMessages[locale]

const initialState = {
  intl: {
    locale,
    messages,
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const configureStore = (preloadedState = {}) => createStore(
  reducers,
  {
    ...preloadedState,
    ...initialState
  },
  composeEnhancers(applyMiddleware(...middleware))
)

export default configureStore
