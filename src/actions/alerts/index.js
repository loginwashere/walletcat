import { createAction } from 'redux-act'
import { PROJECT_ID } from '../../config'

function rand() {
  const n = Math.random() * 1e17
  return (`${n}`).substr(1, 16)
}

const createAlert = error => ({
  id: rand(),
  message: error.response
    ? error.response.data.message
    : error.message,
  description: error.message
})


export const convertError = error => ({
  _error: error.response
    ? error.response.data.message
    : error.message,
  ...(error.response
    ? error.response.data.errors
    : {})
})

export const alertAdd = createAction(`${PROJECT_ID}__ALERT_ADD`, error => createAlert(error))

export const removeAlert = createAction(`${PROJECT_ID}__ALERT_REMOVE`)
