import { createReducer } from 'redux-act'
import * as agentsActions from '../actions/agents'
import * as authActions from '../actions/auth'
import { agentsPaginator } from './pagination'

export const initialState = {
  isFetching: false,
  didInvalidate: false,
  items: {}
}

export const agents = createReducer({
  [agentsActions.invalidateAgents]: state => ({
    ...state,
    didInvalidate: true
  }),
  [agentsActions.fetchAgentsRequest]: state => ({
    ...state,
    isFetching: true
  }),
  [agentsActions.fetchAgentsSuccess]: (state, payload) => ({
    ...state,
    isFetching: false,
    didInvalidate: false,
    items: {
      ...state.items,
      ...payload.data.agents
        .reduce((obj, item) => ({ ...obj, [item.id]: item }), {})
    }
  }),
  [agentsActions.fetchAgentsFailure]: (state) => ({
    ...state,
    isFetching: false,
  }),
  [agentsActions.createAgentRequest]: state => ({
    ...state,
    isFetching: true
  }),
  [agentsActions.createAgentSuccess]: (state, payload) => ({
    ...state,
    isFetching: false,
    didInvalidate: false,
    items: {
      ...state.items,
      [payload.data.id]: payload.data
    },
  }),
  [agentsActions.createAgentFailure]: state => ({
    ...state,
    isFetching: false
  }),
  [agentsActions.updateAgentRequest]: state => ({
    ...state,
    isFetching: true
  }),
  [agentsActions.updateAgentSuccess]: (state, payload) => ({
    ...state,
    isFetching: false,
    didInvalidate: false,
    items: {
      ...state.items,
      [payload.data.id]: payload.data
    },
  }),
  [agentsActions.updateAgentFailure]: state => ({
    ...state,
    isFetching: false
  }),

  [agentsActions.deleteAgentRequest]: state => ({
    ...state,
    isFetching: true
  }),
  [agentsActions.deleteAgentSuccess]: (state, id) => ({
    ...state,
    isFetching: false,
    items: Object.keys(state.items)
      .filter(key => key !== id)
      .reduce((result, current) => {
        result[current] = state.items[current]
        return result
      }, {}),
  }),
  [agentsActions.deleteAgentFailure]: state => ({
    ...state,
    isFetching: false
  }),
  [agentsPaginator.receivePage]: (state, payload) => ({
    ...state,
    items: {
      ...state.items,
      ...agentsPaginator.itemsReducer(state.items, payload)
    }
  }),
  [authActions.logoutSuccess]: () => initialState,
}, initialState)

export default agents
