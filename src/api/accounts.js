import axios from 'axios'
import { API_URL, getToken } from './common'

const API_ACCOUNT_LIST_URL = `${API_URL}accounts`

const formatParamsToSend = (params) => ({
  name: params.name,
  description: params.description,
  currencyId: params.currencyId
})

const fetchAll = () => axios
  .get(API_ACCOUNT_LIST_URL, {
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  })

const create = params => axios({
  url: API_ACCOUNT_LIST_URL,
  method: 'post',
  headers: {
    'Authorization': `Bearer ${getToken()}`
  },
  data: formatParamsToSend(params)
})

const update = (id, params) => axios({
  url: `${API_ACCOUNT_LIST_URL}/${id}`,
  method: 'put',
  headers: {
    'Authorization': `Bearer ${getToken()}`
  },
  data: formatParamsToSend(params)
})

const del = id => axios({
  url: `${API_ACCOUNT_LIST_URL}/${id}`,
  method: 'delete',
  headers: {
    'Authorization': `Bearer ${getToken()}`
  }
})

export default {
  fetchAll,
  create,
  update,
  del
}
