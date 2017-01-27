import axios from 'axios'
import { API_URL, getToken } from './common'

const API_APP_CURRENCY_LIST_URL = `${API_URL}currencies`

const fetchAll = () => axios
  .get(API_APP_CURRENCY_LIST_URL, {
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  })

export default {
  fetchAll
}
