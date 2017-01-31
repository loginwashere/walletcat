import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  updateAccount,
  fetchAccountsPageWithDependenies
} from '../../actions'
import AccountEditForm from '../AccountEditForm'

class AccountView extends Component {
  handleSubmit = (values) => {
    const { dispatch, account: { id } } = this.props
    return dispatch(updateAccount(id, values))
  }

  render() {
    const { account, initialValues, currencyOptions } = this.props
    return (
      account
        ? <AccountEditForm onSubmit={this.handleSubmit}
                           account={account}
                           initialValues={initialValues}
                           enableReinitialize={true}
                           currencyOptions={currencyOptions} />
        : null
    )
  }

  componentDidMount() {
    const { dispatch, accountId } = this.props
    dispatch(fetchAccountsPageWithDependenies({ ids: [accountId] }))
  }
}

AccountView.propTypes = {
  accountId: PropTypes.string.isRequired,
  account: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string
  }),
  currencyOptions: PropTypes.array.isRequired,
  initialValues: PropTypes.object,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state, ownProps) {
  const accountId = ownProps.params.accountId
  const account = state.accounts.items[accountId]
  const userCurrencyIds = state.userCurrencies.itemIds || []
  const userCurrencies = state.userCurrencies.items || {}
  const currencies = state.currencies.items || {}
  const currencyOptions = userCurrencyIds
    .map(userCurrencyId => {
      const userCurrency = userCurrencies[userCurrencyId]
      const currency = currencies[userCurrency.currencyId]
      if (userCurrency && currency) {
        return { id: userCurrencyId, name: currency.name }
      }
    })
    .filter(Boolean)

  return {
    accountId,
    account,
    initialValues: account,
    currencyOptions
  }
}

export default connect(mapStateToProps)(AccountView)
