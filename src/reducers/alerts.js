import {
  ALERT_ADD,
  ALERT_REMOVE
} from '../actions'

export default function alerts(state = { items: [] }, action) {
  switch (action.type) {
    case ALERT_ADD:
      return Object.assign({}, state, {
        items: [
          ...state.items,
          ...[action.alert]
        ]
      })
    case ALERT_REMOVE:
      return Object.assign({}, state, {
        items: state.items.filter((item) => item.id !== action.alert.id)
      })
    default:
      return state
  }
}
