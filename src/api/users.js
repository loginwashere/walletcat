import { API_URL, resource } from './common'

const API_USERS_LIST_URL = `${API_URL}users`

const formatParamsToSend = params => params

export default {
  ...resource(API_USERS_LIST_URL, formatParamsToSend),
  ...{
    fetchAll: undefined,
    update: undefined,
    create: undefined,
    del: undefined
  }
}
