import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  updateTransaction,
  fetchTransactionsPageWithDependencies
} from '../../actions'
import TransactionEditForm from '../TransactionEditForm'

class TransactionView extends Component {
  handleSubmit = (values) => {
    const { dispatch, transaction: { id } } = this.props
    return dispatch(updateTransaction(id, values))
  }

  render() {
    const { transaction, initialValues, accountOptions, categoryOptions } = this.props
    return (
      (transaction &&
      accountOptions.length &&
      categoryOptions.length)
        ? <TransactionEditForm onSubmit={this.handleSubmit}
                            transaction={transaction}
                            initialValues={initialValues}
                             enableReinitialize={true}
                            accountOptions={accountOptions}
                            categoryOptions={categoryOptions} />
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
  accountOptions: PropTypes.array,
  categoryOptions: PropTypes.array,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state, ownProps) {
  const transactionId = ownProps.params.transactionId
  const transaction = state.transactions.items[transactionId]

  const { items: accounts, itemIds: accountIds } = state.accounts || { items: {}, itemIds: [] }
  const { items: categories, itemIds: categoryIds } = state.categories || { items: {}, itemIds: [] }

  const accountOptions = accountIds.map(id => accounts[id])
  const categoryOptions = categoryIds.map(id => categories[id])

  return {
    transactionId,
    transaction,
    initialValues: transaction,
    accountOptions,
    categoryOptions
  }
}

export default connect(mapStateToProps)(TransactionView)
