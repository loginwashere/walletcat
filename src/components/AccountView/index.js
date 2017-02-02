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
    const { account, initialValues, dispatch } = this.props
    return (
      account
        ? <AccountEditForm onSubmit={this.handleSubmit}
                           account={account}
                           initialValues={initialValues}
                           enableReinitialize={true}
                           dispatch={dispatch} />
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
  initialValues: PropTypes.object,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state, ownProps) {
  const accountId = ownProps.params.accountId
  const account = state.accounts.items[accountId]
  const userCurrency = account && state.userCurrencies.items[account.currencyId]
  const currency = userCurrency && state.currencies.items[userCurrency.currencyId]
  const initialValues = account && currency && {
    ...account,
    currencyId: {
      value: account.currencyId,
      label: currency.name
    }
  }

  return {
    accountId,
    account,
    initialValues: account && currency && (({ name, currencyId, amount, description }) =>
      ({ name, currencyId, amount, description }))(initialValues)
  }
}

export default connect(mapStateToProps)(AccountView)
