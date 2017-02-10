import {
  INVALIDATE_AGENT_LIST,
  REQUEST_AGENT_LIST,
  RECEIVE_AGENT_LIST,
  REQUEST_AGENT_CREATE,
  RECEIVE_AGENT_CREATE,
  REQUEST_AGENT_DELETE,
  RECEIVE_AGENT_DELETE,
  REQUEST_AGENT_UPDATE,
  RECEIVE_AGENT_UPDATE,
  LOGOUT_SUCCESS
} from '../actions'
import createPaginator from '../utils/createPaginator'

export const agentsPaginator = createPaginator('/agents/', 'agents')

export const initialState = {
  isFetching: false,
  didInvalidate: false,
  items: {},
  itemIds: [],
  lastUpdated: undefined
}

export default function agents(state = initialState, action) {
  switch (action.type) {
    case INVALIDATE_AGENT_LIST:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_AGENT_LIST:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_AGENT_LIST:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: {
          ...state.items,
          ...action.agents
            .reduce((obj, item) => ({ ...obj, [item.id]: item }), {})
        },
        itemIds: [
          ...state.itemIds,
          ...action.agents
            .map(item => item.id)
            .filter(id => state.itemIds.indexOf(id) === -1)
        ],
        lastUpdated: action.receivedAt
      }
    case REQUEST_AGENT_UPDATE:
    case REQUEST_AGENT_CREATE:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_AGENT_UPDATE:
    case RECEIVE_AGENT_CREATE:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: {
          ...state.items,
          [action.agent.id]: action.agent
        },
        itemIds: [
          ...state.itemIds,
          ...[action.agent]
            .map(item => item.id)
            .filter(id => state.itemIds.indexOf(id) === -1)
        ]
      }
    case REQUEST_AGENT_DELETE:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_AGENT_DELETE:
      return {
        ...state,
        isFetching: false,
        items: Object.keys(state.items)
          .filter(key => key !== action.id)
          .reduce((result, current) => {
            result[current] = state.items[current]
            return result
          }, {}),
        itemIds: [
          ...state.itemIds.slice(0, state.itemIds.indexOf(action.id)),
          ...state.itemIds.slice(state.itemIds.indexOf(action.id) + 1)
        ]
      }
    case LOGOUT_SUCCESS:
      return initialState
    default:
      return {
        ...state,
        items: {
          ...state.items,
          ...agentsPaginator.itemsReducer(state.items, action)
        }
      }
  }
}
