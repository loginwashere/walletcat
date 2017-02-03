import { push } from 'react-router-redux'
import { alertAdd, convertError } from '..'
import { SubmissionError } from 'redux-form'
import api from '../../api'
import { agentsPaginator } from '../../reducers/agents'

export const INVALIDATE_AGENT_LIST = 'INVALIDATE_AGENT_LIST'

export function invalidateAgents() {
  return {
    type: INVALIDATE_AGENT_LIST
  }
}

export const REQUEST_AGENT_LIST = 'REQUEST_AGENT_LIST'

export function requestAgents() {
  return {
    type: REQUEST_AGENT_LIST
  }
}

export const RECEIVE_AGENT_LIST = 'RECEIVE_AGENT_LIST'

export function receiveAgents(json) {
  return {
    type: RECEIVE_AGENT_LIST,
    agents: json.data.agents,
    receivedAt: Date.now()
  }
}

function fetchAgents({ page, limit, filter }) {
  return dispatch => {
    dispatch(requestAgents())
    !filter && dispatch(agentsPaginator.requestPage(page, limit))
    return api.agents
      .fetchAll({ page, limit, filter })
      .then(json => {
        dispatch(receiveAgents(json))
        !filter && dispatch(
            agentsPaginator.receivePage(
              parseInt(json.data.meta.page, 10),
              parseInt(json.data.meta.limit, 10),
              Boolean(json.data.meta.hasNextPage),
              json.data.agents
            )
          )
        return Promise.resolve(json.data)
      })
      .catch(error => dispatch(alertAdd(error)))
  }
}

const shouldFetchAgents = ({
  agents: { isFetching, didInvalidate },
  pagination: { agents: { currentPage } }
}, page, filter) => {
  if (filter || currentPage !== page) {
    return true
  } else if (isFetching) {
    return false
  } else {
    return didInvalidate
  }
}

export const fetchAgentsIfNeeded = ({ page, limit, filter }) => (dispatch, getState) => {
  if (shouldFetchAgents(getState(), page, filter)) {
    return dispatch(fetchAgents({ page, limit, filter }))
  } else {
    return Promise.resolve()
  }
}

export const REQUEST_AGENT_CREATE = 'REQUEST_AGENT_CREATE'

export function requestAgentCreate() {
  return {
    type: REQUEST_AGENT_CREATE
  }
}

export const RECEIVE_AGENT_CREATE = 'RECEIVE_AGENT_CREATE'

export function receiveAgentCreate(json) {
  return {
    type: RECEIVE_AGENT_CREATE,
    agent: json.data,
    receivedAt: Date.now()
  }
}

export function createAgent(params) {
  return dispatch => {
    dispatch(requestAgentCreate())
    return api.agents
      .create(params)
      .then(json => {
        dispatch(receiveAgentCreate(json))
        dispatch(push('/agents'))
      })
      .catch(error => {
        throw new SubmissionError(convertError(error))
      })
  }
}

export const REQUEST_AGENT_DELETE = 'REQUEST_AGENT_DELETE'

function requestAgentDelete(id) {
  return {
    type: REQUEST_AGENT_DELETE,
    id
  }
}

export const RECEIVE_AGENT_DELETE = 'RECEIVE_AGENT_DELETE'

function receiveAgentDelete(id) {
  return {
    type: RECEIVE_AGENT_DELETE,
    id
  }
}

export function deleteAgent(id) {
  return dispatch => {
    dispatch(requestAgentDelete(id))
    return api.agents
      .del(id)
      .then(() => {
        dispatch(receiveAgentDelete(id))
        dispatch(push('/agents'))
      })
      .catch(error => dispatch(alertAdd(error)))
  }
}

export const REQUEST_AGENT_UPDATE = 'REQUEST_AGENT_UPDATE'

function requestAgentUpdate(id, params) {
  return {
    type: REQUEST_AGENT_UPDATE,
    id,
    params
  }
}

export const RECEIVE_AGENT_UPDATE = 'RECEIVE_AGENT_UPDATE'

function receiveAgentUpdate(json) {
  return {
    type: RECEIVE_AGENT_UPDATE,
    agent: json.data
  }
}

export function updateAgent(id, params) {
  return dispatch => {
    dispatch(requestAgentUpdate(id, params))
    return api.agents
      .update(id, params)
      .then(json => {
        dispatch(receiveAgentUpdate(json))
        dispatch(push('/agents'))
      })
      .catch(error => {
        throw new SubmissionError(convertError(error))
      })
  }
}
