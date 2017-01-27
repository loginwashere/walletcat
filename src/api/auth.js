import axios from 'axios'
import { API_URL } from './common'

const login = (params) => axios
  .post(`${API_URL}auth`, params)

const register = (params) => axios
  .post(`${API_URL}users`, params)

export default {
  login,
  register
}