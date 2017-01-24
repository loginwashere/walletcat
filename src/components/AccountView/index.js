import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  updateAccount,
  fetchAccountsAndAppAndUserCurrenciesIfNeeded
} from '../../actions'
import AccountEditForm from '../AccountEditForm'

class AccountView extends Component {
  handleSubmit = (values) => {
    const { dispatch, account: { id } } = this.props
    return dispatch(updateAccount(id, values))
  }

  render() {
    const { account, initialValues, options } = this.props
    return (
      <AccountEditForm onSubmit={this.handleSubmit}
                       account={account}
                       initialValues={initialValues}
                       enableReinitialize={true}
                       options={options} />
    )
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchAccountsAndAppAndUserCurrenciesIfNeeded())
  }
}

AccountView.propTypes = {
  account: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string
  }).isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state, ownProps) {
  const account = state.accounts.items[ownProps.params.accountId] || {}
  const userCurrencyIds = state.userCurrencies.itemIds || []
  const userCurrencies = state.userCurrencies.items || {}
  const currencies = state.currencies.items || {}
  const options = userCurrencyIds.map(userCurrencyId => {
        const userCurrency = userCurrencies[userCurrencyId]
        const currency = currencies[userCurrency.currencyId]
        return {id: userCurrencyId, name: currency.name}
    });

  return {
    account,
    initialValues: account,
    options: options
  }
}

AccountView = connect(mapStateToProps)(AccountView)

export default AccountView
