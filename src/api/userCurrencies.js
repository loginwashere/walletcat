import { API_URL, resource } from './common'

const API_USER_CURRENCY_LIST_URL = `${API_URL}user-currencies`

const formatParamsToSend = params => params

export default {
  ...resource(API_USER_CURRENCY_LIST_URL, formatParamsToSend),
  ...{
    update: undefined
  }
}
