import { API_URL, resource } from './common'

const API_TRANSACTION_LIST_URL = `${API_URL}transactions`

export const selectEditProps = ({
  fromAccountId, toAccountId, fromAmount, toAmount, fromRate, toRate, categoryId, date, description
}) => ({ fromAccountId, toAccountId, fromAmount, toAmount, fromRate, toRate, categoryId, date, description })

const formatParamsToSend = params => selectEditProps(params)

export default {
  ...resource(API_TRANSACTION_LIST_URL, formatParamsToSend)
}
