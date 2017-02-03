import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import TransactionCreateForm from '../TransactionCreateForm'
import { createTransaction } from '../../actions'

export class TransactionCreate extends Component {
  handleSubmit = (values) => {
    const { dispatch } = this.props
    return dispatch(createTransaction(values))
  }

  render() {
    const { dispatch } = this.props
    return (
      <TransactionCreateForm onSubmit={this.handleSubmit}
                             dispatch={dispatch} />
    )
  }
}

TransactionCreate.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default connect()(TransactionCreate)
