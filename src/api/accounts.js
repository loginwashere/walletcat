import { API_URL, resource } from './common'

const API_ACCOUNT_LIST_URL = `${API_URL}accounts`

export const selectEditProps = ({
  name, currencyId, amount, description
}) => ({ name, currencyId, amount, description })

const formatParamsToSend = params => selectEditProps(params)

export default {
  ...resource(API_ACCOUNT_LIST_URL, formatParamsToSend)
}
