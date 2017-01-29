import axios from 'axios'
import { API_URL, getToken } from './common'

const API_USERS_LIST_URL = `${API_URL}users`

const fetchOne = (id) => axios
  .get(`${API_USERS_LIST_URL}/${id}`, {
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  })

export default {
  fetchOne
}
