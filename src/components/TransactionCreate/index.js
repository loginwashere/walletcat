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
    const { dispatch, initialValues } = this.props
    return (
      <TransactionCreateForm onSubmit={this.handleSubmit}
                             initialValues={initialValues}
                             dispatch={dispatch} />
    )
  }
}

TransactionCreate.propTypes = {
  dispatch: PropTypes.func.isRequired,
  initialValues: PropTypes.object
}

function mapStateToProps(state) {
  const initialValues = {
    date: format(new Date())
  }
  return {
    initialValues
  }
}

export default connect(mapStateToProps)(TransactionCreate)
