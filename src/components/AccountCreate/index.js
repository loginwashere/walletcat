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
    const { dispatch } = this.props
    return (
      <AccountCreateForm onSubmit={this.handleSubmit}
                         initialValues={{ amount: 0 }}
                         dispatch={dispatch} />
    )
  }
}

AccountCreate.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default  connect()(AccountCreate)
