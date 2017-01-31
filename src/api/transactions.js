import { API_URL, resource } from './common'

const API_TRANSACTION_LIST_URL = `${API_URL}transactions`

const formatParamsToSend = (params) => ({
  fromAccountId: params.fromAccountId,
  toAccountId: params.toAccountId,
  fromAmount: params.fromAmount,
  toAmount: params.toAmount,
  fromRate: params.fromRate,
  toRate: params.toRate,
  categoryId: params.categoryId,
  date: params.date,
  description: params.description
})

export default {
  ...resource(API_TRANSACTION_LIST_URL, formatParamsToSend)
}
