import { API_URL, resource } from './common'

const API_ACCOUNT_LIST_URL = `${API_URL}accounts`

export const selectEditProps = ({
  name, currencyId, agentId, amount, description
}) => ({ name, currencyId, agentId, amount, description })

export default {
  ...resource(API_ACCOUNT_LIST_URL, selectEditProps)
}
