import { createReducer } from 'redux-act'
import * as alertsActions from '../actions/alerts'

const alerts = createReducer({
  [alertsActions.alertAdd]: (state, payload) => ({
    ...state,
    items: [
      ...state.items,
      ...[payload]
    ]
  }),
  [alertsActions.removeAlert]: (state, payload) => ({
    ...state,
    items: state.items.filter((item) => item.id !== payload.id)
  }),
}, { items: [] })

export default alerts
