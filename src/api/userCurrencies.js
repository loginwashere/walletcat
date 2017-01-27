import axios from 'axios'
import { API_URL, getToken } from './common'

const API_USER_CURRENCY_LIST_URL = `${API_URL}user-currencies`

const fetchAll = () => axios
  .get(API_USER_CURRENCY_LIST_URL, {
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  })

const create = params => axios({
  url: API_USER_CURRENCY_LIST_URL,
  method: 'post',
  headers: {
    'Authorization': `Bearer ${getToken()}`
  },
  data: params
})

const del = id => axios({
  url: `${API_USER_CURRENCY_LIST_URL}/${id}`,
  method: 'delete',
  headers: {
    'Authorization': `Bearer ${getToken()}`
  }
})

export default {
  fetchAll,
  create,
  del
}
