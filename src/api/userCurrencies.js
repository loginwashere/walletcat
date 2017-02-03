import { API_URL, resource } from './common'

const API_USER_CURRENCY_LIST_URL = `${API_URL}user-currencies`

export const selectEditProps = params => params

export default {
  ...resource(API_USER_CURRENCY_LIST_URL, selectEditProps),
  ...{
    update: undefined
  }
}
