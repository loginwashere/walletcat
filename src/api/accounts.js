import { API_URL, resource } from './common'

const API_ACCOUNT_LIST_URL = `${API_URL}accounts`

const formatParamsToSend = (params) => ({
  name: params.name,
  description: params.description,
  currencyId: params.currencyId
})

export default {
  ...resource(API_ACCOUNT_LIST_URL, formatParamsToSend)
}
