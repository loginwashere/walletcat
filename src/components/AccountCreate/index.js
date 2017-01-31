import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import AccountCreateForm from '../AccountCreateForm'
import {
  createAccount,
  fetchUserCurrenciesPageWithDependencies
} from '../../actions'

export class AccountCreate extends Component {
  handleSubmit = (values) => {
    const { dispatch } = this.props
    return dispatch(createAccount(values))
  }

  render() {
    const { currencies, userCurrencies, userCurrenciesPagination } = this.props
    return (
      <AccountCreateForm currencies={currencies}
                         userCurrencies={userCurrencies}
                         userCurrenciesPagination={userCurrenciesPagination}
                         onSubmit={this.handleSubmit}
                         initialValues={{ amount: 0 }} />
    )
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchUserCurrenciesPageWithDependencies({ page: 1 }))
  }
}

AccountCreate.propTypes = {
  userCurrencies: PropTypes.object.isRequired,
  currencies: PropTypes.object.isRequired,
  userCurrenciesPagination: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { items: currencies } = state.currencies || { items: {} }
  const {
    items: userCurrencies
  } = state.userCurrencies || {
    items: {}
  }

  return {
    currencies,
    userCurrencies,
    userCurrenciesPagination: state.pagination.userCurrencies
  }
}

export default  connect(mapStateToProps)(AccountCreate)
