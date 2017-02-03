import { API_URL, resource } from './common'

const API_APP_CURRENCY_LIST_URL = `${API_URL}currencies`

export const selectEditProps = params => params

export default {
  fetchAll: resource(API_APP_CURRENCY_LIST_URL, selectEditProps).fetchAll
}
