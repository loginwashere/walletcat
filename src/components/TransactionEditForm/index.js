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
  prepareFromAccountOptions = result => {
    const { customInitialValues } = this.props
    const options = result.accounts
      .map(account => ({ value: account.id, label: account.name }))
      .filter(Boolean)
      .filter(option => option.label !== customInitialValues.fromAccountId.label)
      .concat(customInitialValues && customInitialValues.fromAccountId && [customInitialValues.fromAccountId])
      .filter(Boolean)
    return { options }
  }

  loadFromAccountOptions = (value) => {
    const { dispatch } = this.props
    return dispatch(fetchAccountsIfNeeded({ filter: { name: value } }))
      .then(this.prepareFromAccountOptions)
  }

  prepareToAccountOptions = result => {
    const { customInitialValues } = this.props
    const options = result.accounts
      .map(account => ({ value: account.id, label: account.name }))
      .filter(Boolean)
      .filter(option => option.label !== customInitialValues.toAccountId.label)
      .concat(customInitialValues && customInitialValues.toAccountId && [customInitialValues.toAccountId])
      .filter(Boolean)
    return { options }
  }

  loadToAccountOptions = (value) => {
    const { dispatch } = this.props
    return dispatch(fetchAccountsIfNeeded({ filter: { name: value } }))
      .then(this.prepareToAccountOptions)
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
      customInitialValues
    } = this.props
    return (
      <Form horizontal
            onSubmit={handleSubmit}>
        <WalletFormHeader error={error}>Transaction {transaction.id}</WalletFormHeader>

        <TransactionFormFields type="edit"
                               customInitialValues={customInitialValues}
                               loadFromAccountOptions={this.loadFromAccountOptions}
                               loadToAccountOptions={this.loadToAccountOptions}
                               loadCategoriesOptions={this.loadCategoriesOptions}/>

        <EditFormButtonsGroup cancelTo="/transactions"
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
  dispatch: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'transactionEdit',
  validate: values => getValidate(values, transactionSchema)
})(TransactionEditForm)
