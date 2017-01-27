import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import TransactionCreateForm from '../TransactionCreateForm'
import {
  createTransaction,
  fetchTransactionsAccountsCategoriesIfNeeded
} from '../../actions'

export class TransactionCreate extends Component {
  handleSubmit = (values) => {
    const { dispatch } = this.props
    return dispatch(createTransaction(values))
  }

  render() {
    const { accountOptions, categoryOptions } = this.props
    return (
      <TransactionCreateForm onSubmit={this.handleSubmit}
                             accountOptions={accountOptions}
                             categoryOptions={categoryOptions} />
    )
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchTransactionsAccountsCategoriesIfNeeded())
  }
}

TransactionCreate.propTypes = {
  accountOptions: PropTypes.array.isRequired,
  categoryOptions: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { items: accounts, itemIds: accountIds } = state.accounts || { items: {}, itemIds: [] }
  const { items: categories, itemIds: categoryIds } = state.categories || { items: {}, itemIds: [] }

  const accountOptions = accountIds.map(id => accounts[id])
  const categoryOptions = categoryIds.map(id => categories[id])

  return {
    accountOptions,
    categoryOptions
  }
}

export default connect(mapStateToProps)(TransactionCreate)
