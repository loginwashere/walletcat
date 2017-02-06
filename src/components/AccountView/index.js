import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  updateAccount,
  fetchAccountsPageWithDependenies
} from '../../actions'
import { selectEditProps } from '../../api/accounts'
import AccountEditForm from '../AccountEditForm'

export class AccountView extends Component {
  handleSubmit = (values) => {
    const { dispatch, account: { id } } = this.props
    return dispatch(updateAccount(id, values))
  }

  render() {
    const { account, initialValues, customInitialValues, dispatch } = this.props
    return (
      account
        ? <AccountEditForm onSubmit={this.handleSubmit}
                           account={account}
                           initialValues={initialValues}
                           customInitialValues={customInitialValues}
                           enableReinitialize={true}
                           dispatch={dispatch} />
        : null
    )
  }

  componentDidMount() {
    const { dispatch, accountId } = this.props
    dispatch(fetchAccountsPageWithDependenies({ filter: { id: [accountId] } }))
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
  customInitialValues: PropTypes.object,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state, ownProps) {
  const accountId = ownProps.params.accountId
  const account = state.accounts.items[accountId]
  const userCurrency = account && state.userCurrencies.items[account.currencyId]
  const currency = userCurrency && state.currencies.items[userCurrency.currencyId]
  const initialValues = account && currency && account
  const customInitialValues = initialValues && {
    ...initialValues,
    currencyId: {
      value: account.currencyId,
      label: currency.name,
      clearableValue: false
    }
  }

  return {
    accountId,
    account,
    initialValues: initialValues && selectEditProps(initialValues),
    customInitialValues: customInitialValues && selectEditProps(customInitialValues),
  }
}

export default connect(mapStateToProps)(AccountView)
