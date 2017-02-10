import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import AccountCreateForm from '../AccountCreateForm'
import {
  createAccount
} from '../../actions'

export class AccountCreate extends Component {
  handleSubmit = (values) => {
    const { dispatch } = this.props
    return dispatch(createAccount(values))
  }

  render() {
    const { dispatch, currentPage } = this.props
    return (
      <AccountCreateForm onSubmit={this.handleSubmit}
                         initialValues={{ amount: 0 }}
                         dispatch={dispatch}
                         currentPage={currentPage} />
    )
  }
}

AccountCreate.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired
}

function mapStateToProps(state) {
  const currentPage = state.pagination.accounts.currentPage || 1
  return {
    currentPage
  }
}

export default  connect(mapStateToProps)(AccountCreate)
