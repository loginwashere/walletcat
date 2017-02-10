import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  updateTransaction,
  fetchTransactionsPageWithDependencies
} from '../../actions'
import { selectEditProps } from '../../api/transactions'
import TransactionEditForm from '../TransactionEditForm'

class TransactionView extends Component {
  handleSubmit = (values) => {
    const { dispatch, transactionId } = this.props
    return dispatch(updateTransaction(transactionId, values))
  }

  render() {
    const { transaction, initialValues, customInitialValues, currentPage } = this.props
    return (
      transaction
        ? <TransactionEditForm onSubmit={this.handleSubmit}
                            transaction={transaction}
                            initialValues={initialValues}
                            customInitialValues={customInitialValues}
                            enableReinitialize={true}
                            currentPage={currentPage} />
        : null
    )
  }

  componentDidMount() {
    const { dispatch, transactionId } = this.props
    dispatch(fetchTransactionsPageWithDependencies({ filter: { id: [transactionId] } }))
  }
}

TransactionView.propTypes = {
  transactionId: PropTypes.string.isRequired,
  transaction: PropTypes.shape({
    id: PropTypes.string,
    description: PropTypes.string
  }),
  initialValues: PropTypes.object,
  customInitialValues: PropTypes.object,
  accountOptions: PropTypes.array,
  categoryOptions: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired
}

function mapStateToProps(state, ownProps) {
  const transactionId = ownProps.params.transactionId
  const transactionItems = state.transactionItems.items
  const accounts = state.accounts.items
  const transaction = state.transactions.items[transactionId]
  const category = transaction && state.categories.items[transaction.categoryId]
  const initialValues = transaction && transactionItems && category &&
    {
      ...transaction,
      transactionItems: transaction.transactionItems
        .map(transactionItemId => {
          const transactionItem = transactionItems[transactionItemId]
          return transactionItem && {
            id: transactionItem.id,
            accountId: transactionItem.accountId,
            type: transactionItem.type,
            amount: transactionItem.amount,
            rate: transactionItem.rate,
          }
        })
        .filter(Boolean)
    }
  const customInitialValues = initialValues && accounts && {
    ...initialValues,
    categoryId: {
      value: category.id,
      label: category.name,
      clearableValue: false
    },
    transactionItems: transaction.transactionItems
      .map(transactionItemId => {
        const transactionItem = transactionItems[transactionItemId]
        const account = transactionItem && accounts[transactionItem.accountId]
        return transactionItem && account && {
          accountId: {
            value: account.id,
            label: account.name,
            clearableValue: false
          },
          type: transactionItem.type,
          amount: transactionItem.amount,
          rate: transactionItem.rate,
        }
      })
      .filter(Boolean)
  }
  const currentPage = state.pagination.transactions.currentPage || 1

  return {
    currentPage,
    transactionId,
    transaction,
    initialValues: initialValues && selectEditProps(initialValues),
    customInitialValues: customInitialValues && selectEditProps(customInitialValues)
  }
}

export default connect(mapStateToProps)(TransactionView)
