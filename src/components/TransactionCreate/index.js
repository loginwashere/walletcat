import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import format from 'date-fns/format'
import TransactionCreateForm from '../TransactionCreateForm'
import { createTransaction } from '../../actions'

export class TransactionCreate extends Component {
  handleSubmit = (values) => {
    const { dispatch } = this.props
    return dispatch(createTransaction(values))
  }

  render() {
    const { dispatch, currentPage } = this.props
    const initialValues = {
      date: format(new Date()),
      transactionItems: [
        {
          type: 'credit'
        },
        {
          type: 'debit'
        }
      ]
    }
    return (
      <TransactionCreateForm onSubmit={this.handleSubmit}
                             initialValues={initialValues}
                             dispatch={dispatch}
                             currentPage={currentPage} />
    )
  }
}

TransactionCreate.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired
}

function mapStateToProps(state) {
  const currentPage = state.pagination.transactions.currentPage || 1
  return {
    currentPage
  }
}

export default connect(mapStateToProps)(TransactionCreate)
