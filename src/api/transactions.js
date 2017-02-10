import { API_URL, resource } from './common'

const API_TRANSACTION_LIST_URL = `${API_URL}transactions`

export const selectEditProps = ({
  transactionItems, categoryId, date, description
}) => ({ transactionItems, categoryId, date, description })

export default {
  ...resource(API_TRANSACTION_LIST_URL, selectEditProps)
}
