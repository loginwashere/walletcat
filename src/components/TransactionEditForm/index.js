import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { Form } from 'react-bootstrap'
import {
  fetchCategoriesPageWithDependencies,
  fetchAccountsIfNeeded
} from '../../actions'
import { transactionSchema } from '../../../common/validation'
import {
  WalletFormHeader,
  EditFormButtonsGroup,
  getValidate
} from '../Common'
import TransactionFormFields from '../TransactionFormFields'

class TransactionEditForm extends Component {
  prepareAccountOptions = result => {
    const { customInitialValues } = this.props
    const accountLabels = customInitialValues.transactionItems.map(transactionItem => transactionItem.accountId.label)
    const options = result.accounts
      .map(account => ({ value: account.id, label: account.name }))
      .filter(Boolean)
      .filter(option => accountLabels.indexOf(option.label) === -1)
      .concat(customInitialValues &&
        customInitialValues.transactionItems &&
        customInitialValues.transactionItems.map(transactionItem => transactionItem.accountId))
      .filter(Boolean)
    return { options }
  }

  loadAccountOptions = (value) => {
    const { dispatch } = this.props
    return dispatch(fetchAccountsIfNeeded({ filter: { name: value } }))
      .then(this.prepareAccountOptions)
  }

  prepareCategoriesOptions = result => {
    const { customInitialValues } = this.props
    const options = result.categories
      .map(category => ({ value: category.id, label: category.name }))
      .filter(Boolean)
      .filter(option => option.label !== customInitialValues.categoryId.label)
      .concat(customInitialValues && customInitialValues.categoryId && [customInitialValues.categoryId])
      .filter(Boolean)
    return { options }
  }

  loadCategoriesOptions = (value) => {
    const { dispatch } = this.props
    return dispatch(fetchCategoriesPageWithDependencies({ filter: { name: value } }))
      .then(this.prepareCategoriesOptions)
  }

  render() {
    const {
      error,
      handleSubmit,
      submitting,
      transaction,
      pristine,
      reset,
      invalid,
      customInitialValues,
      currentPage
    } = this.props
    return (
      <Form horizontal
            onSubmit={handleSubmit}>
        <WalletFormHeader error={error}>Transaction {transaction.id}</WalletFormHeader>

        <TransactionFormFields type="edit"
                               customInitialValues={customInitialValues}
                               loadAccountOptions={this.loadAccountOptions}
                               loadCategoriesOptions={this.loadCategoriesOptions}/>

        <EditFormButtonsGroup cancelTo={{ pathname: '/transactions', query: { page: currentPage } }}
                              deleteTo={`/transactions/${transaction.id}/delete`}
                              submitting={submitting}
                              pristine={pristine}
                              reset={reset}
                              invalid={invalid}
                              error={error}/>
      </Form>
    )
  }
}

TransactionEditForm.propTypes = {
  customInitialValues: PropTypes.object,
  initialValues: PropTypes.object,
  transaction: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired
}

export default reduxForm({
  form: 'transactionEdit',
  validate: values => getValidate(values, transactionSchema)
})(TransactionEditForm)
