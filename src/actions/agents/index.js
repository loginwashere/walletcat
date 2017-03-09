import { createAction } from 'redux-act'
import { push } from 'react-router-redux'
import { alertAdd, convertError } from '..'
import { SubmissionError } from 'redux-form'
import api from '../../api'
import { agentsPaginator } from '../../reducers/pagination'
import { PROJECT_ID } from '../../config'

export const invalidateAgents = createAction(`${PROJECT_ID}__AGENT_LIST__INVALIDATE`)

export const fetchAgentsRequest = createAction(`${PROJECT_ID}__AGENT_LIST__REQUEST`)
export const fetchAgentsSuccess = createAction(`${PROJECT_ID}__AGENT_LIST__SUCCESS`)
export const fetchAgentsFailure = createAction(`${PROJECT_ID}__AGENT_LIST__FAILURE`)

const fetchAgentsPage = ({ page, limit }) => dispatch => {
  dispatch(agentsPaginator.requestPage(page, limit))
  return api.agents
    .fetchAll({ page, limit })
    .then(response => {
      dispatch(
        agentsPaginator.receivePage(
          response.data.meta.page,
          response.data.meta.limit,
          response.data.meta.hasNextPage,
          response.data.agents
        )
      )
      return Promise.resolve(response.data)
    })
    .catch(error => {
      dispatch(fetchAgentsFailure(error))
      dispatch(alertAdd(error))
    })
}

const fetchAgentsFilter = (filter) => dispatch => {
  dispatch(fetchAgentsRequest())
  return api.agents
    .fetchAll({ filter })
    .then(response => {
      dispatch(fetchAgentsSuccess({ data: response.data }))
      return Promise.resolve(response.data)
    })
    .catch(error => {
      dispatch(fetchAgentsFailure(error))
      dispatch(alertAdd(error))
    })
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
    return filter
      ? dispatch(fetchAgentsFilter(filter))
      : dispatch(fetchAgentsPage({ page, limit }))
  } else {
    return Promise.resolve()
  }
}

export const createAgentRequest = createAction(`${PROJECT_ID}__AGENT_CREATE__REQUEST`)
export const createAgentSuccess = createAction(`${PROJECT_ID}__AGENT_CREATE__SUCCESS`)
export const createAgentFailure = createAction(`${PROJECT_ID}__AGENT_CREATE__FAILURE`)

export const createAgent = params => dispatch => {
  dispatch(createAgentRequest(params))
  return api.agents
    .create(params)
    .then(response => {
      dispatch(createAgentSuccess({ data: response.data }))
      dispatch(invalidateAgents())
      dispatch(push('/agents'))
    })
    .catch(error => {
      dispatch(createAgentFailure(error))
      throw new SubmissionError(convertError(error))
    })
}

export const deleteAgentRequest = createAction(`${PROJECT_ID}__AGENT_DELETE__REQUEST`)
export const deleteAgentSuccess = createAction(`${PROJECT_ID}__AGENT_DELETE__SUCCESS`)
export const deleteAgentFailure = createAction(`${PROJECT_ID}__AGENT_DELETE__FAILURE`)

export const deleteAgent = id => dispatch => {
  dispatch(deleteAgentRequest(id))
  return api.agents
    .del(id)
    .then(() => {
      dispatch(deleteAgentSuccess(id))
      dispatch(invalidateAgents())
      dispatch(push('/agents'))
    })
    .catch(error => {
      dispatch(deleteAgentFailure(error))
      dispatch(alertAdd(error))
    })
}

export const updateAgentRequest = createAction(`${PROJECT_ID}__AGENT_UPDATE__REQUEST`)
export const updateAgentSuccess = createAction(`${PROJECT_ID}__AGENT_UPDATE__SUCCESS`)
export const updateAgentFailure = createAction(`${PROJECT_ID}__AGENT_UPDATE__FAILURE`)

export const updateAgent = (id, params) => dispatch => {
  dispatch(updateAgentRequest({ id, params }))
  return api.agents
    .update(id, params)
    .then(response => {
      dispatch(updateAgentSuccess({ data: response.data }))
      dispatch(push('/agents'))
    })
    .catch(error => {
      dispatch(updateAgentFailure(error))
      throw new SubmissionError(convertError(error))
    })
}
