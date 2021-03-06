import { API_URL, resource } from './common'

const API_CATEGORY_LIST_URL = `${API_URL}categories`

export const selectEditProps = ({
  name, description
}) => ({ name, description })

export default {
  ...resource(API_CATEGORY_LIST_URL, selectEditProps)
}
