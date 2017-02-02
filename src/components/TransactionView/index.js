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
    const { transaction, initialValues, customInitialValues } = this.props
    return (
      transaction
        ? <TransactionEditForm onSubmit={this.handleSubmit}
                            transaction={transaction}
                            initialValues={initialValues}
                            customInitialValues={customInitialValues}
                            enableReinitialize={true} />
        : null
    )
  }

  componentDidMount() {
    const { dispatch, transactionId } = this.props
    dispatch(fetchTransactionsPageWithDependencies({ ids: [transactionId] }))
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
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state, ownProps) {
  const transactionId = ownProps.params.transactionId
  const transaction = state.transactions.items[transactionId]
  const fromAccount = transaction && state.accounts.items[transaction.fromAccountId]
  const toAccount = transaction && state.accounts.items[transaction.toAccountId]
  const category = transaction && state.categories.items[transaction.categoryId]
  const initialValues = transaction && fromAccount && toAccount && category && transaction
  const customInitialValues = initialValues && {
    ...initialValues,
    fromAccountId: {
      value: fromAccount.id,
      label: fromAccount.name,
      clearableValue: false
    },
    toAccountId: {
      value: toAccount.id,
      label: toAccount.name,
      clearableValue: false
    },
    categoryId: {
      value: category.id,
      label: category.name,
      clearableValue: false
    }
  }

  return {
    transactionId,
    transaction,
    initialValues: initialValues && selectEditProps(initialValues),
    customInitialValues: customInitialValues && selectEditProps(customInitialValues)
  }
}

export default connect(mapStateToProps)(TransactionView)
