import axios from 'axios'
import { API_URL } from './common'

const login = params => axios
  .post(`${API_URL}auth`, params)

const register = params => axios
  .post(`${API_URL}users`, params)

const confirmEmail = code => axios
  .post(`${API_URL}users/email-confirm`, { emailConfirm: code })

const resendConfirmEmail = email => axios
  .post(`${API_URL}users/resend-email-confirm`, { email })

export default {
  login,
  register,
  confirmEmail,
  resendConfirmEmail
}