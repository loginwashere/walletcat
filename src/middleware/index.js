import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'

const middleware = [ thunk, routerMiddleware(browserHistory) ]
if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
  middleware.push(createLogger())
}

export default middleware