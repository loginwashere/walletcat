import { API_URL, resource } from './common'

const API_USERS_LIST_URL = `${API_URL}users`

export const selectEditProps = params => params

export default {
  ...resource(API_USERS_LIST_URL, selectEditProps),
  ...{
    fetchAll: undefined,
    update: undefined,
    create: undefined,
    del: undefined
  }
}
