import axios from 'axios'
import { API_URL, getToken } from './common'

const API_TRANSACTION_LIST_URL = `${API_URL}transactions`

const formatParamsToSend = (params) => ({
  fromAccountId: params.fromAccountId,
  toAccountId: params.toAccountId,
  fromAmount: params.fromAmount,
  toAmount: params.toAmount,
  fromRate: params.fromRate,
  toRate: params.toRate,
  categoryId: params.categoryId,
  date: params.date,
  description: params.description
})

const fetchAll = () => axios
  .get(API_TRANSACTION_LIST_URL, {
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  })

const create = params => axios({
  url: API_TRANSACTION_LIST_URL,
  method: 'post',
  headers: {
    'Authorization': `Bearer ${getToken()}`
  },
  data: formatParamsToSend(params)
})

const update = (id, params) => axios({
  url: `${API_TRANSACTION_LIST_URL}/${id}`,
  method: 'put',
  headers: {
    'Authorization': `Bearer ${getToken()}`
  },
  data: formatParamsToSend(params)
})

const del = id => axios({
  url: `${API_TRANSACTION_LIST_URL}/${id}`,
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
