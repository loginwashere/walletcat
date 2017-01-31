import { API_URL, resource } from './common'

const API_APP_CURRENCY_LIST_URL = `${API_URL}currencies`

const formatParamsToSend = params => params

export default {
  fetchAll: resource(API_APP_CURRENCY_LIST_URL, formatParamsToSend).fetchAll
}
