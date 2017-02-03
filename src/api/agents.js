import { API_URL, resource } from './common'

const API_AGENTS_LIST_URL = `${API_URL}agents`

export const selectEditProps = ({
  name, description
}) => ({ name, description })

export default {
  ...resource(API_AGENTS_LIST_URL, selectEditProps)
}
