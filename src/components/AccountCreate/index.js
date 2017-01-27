import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import AccountCreateForm from '../AccountCreateForm'
import {
  createAccount,
  fetchAppAndUserCurrenciesIfNeeded
} from '../../actions'

export class AccountCreate extends Component {
  handleSubmit = (values) => {
    const { dispatch } = this.props
    return dispatch(createAccount(values))
  }

  render() {
    const { currencies, userCurrencies, userCurrencyIds } = this.props
    return (
      <AccountCreateForm currencies={currencies}
                         userCurrencies={userCurrencies}
                         userCurrencyIds={userCurrencyIds}
                         onSubmit={this.handleSubmit}
                         initialValues={{ amount: 0 }} />
    )
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchAppAndUserCurrenciesIfNeeded())
  }
}

AccountCreate.propTypes = {
  userCurrencies: PropTypes.object.isRequired,
  userCurrencyIds: PropTypes.array.isRequired,
  currencies: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { items: currencies } = state.currencies || { items: {} }
  const {
    items: userCurrencies,
    itemIds: userCurrencyIds
  } = state.userCurrencies || {
    items: {},
    itemIds: []
  }

  return {
    currencies,
    userCurrencies,
    userCurrencyIds
  }
}

export default  connect(mapStateToProps)(AccountCreate)
