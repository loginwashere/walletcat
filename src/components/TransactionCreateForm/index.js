import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { Form } from 'react-bootstrap'
import {
  fetchCategoriesPageWithDependencies,
  fetchAccountsIfNeeded
} from '../../actions'
import { transactionSchema } from '../../../common/validation'
import {
  CreateFormButtonsGroup,
  WalletFormHeader,
  getValidate
} from '../Common'
import TransactionFormFields from '../TransactionFormFields'

export class TransactionCreateForm extends Component {
  prepareAccountsOptions = result => {
    const options = result.accounts
      .map(account => ({ value: account.id, label: account.name }))
    return { options }
  }

  loadAccountsOptions = (value) => {
    const { dispatch } = this.props
    return dispatch(fetchAccountsIfNeeded({ filter: { name: value } }))
      .then(this.prepareAccountsOptions)
  }

  prepareCategoriesOptions = result => {
    const options = result.categories
      .map(category => ({ value: category.id, label: category.name }))
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
      pristine,
      reset,
      submitting,
      invalid,
      currentPage
    } = this.props
    return (
      <Form horizontal
            onSubmit={handleSubmit}>
        <WalletFormHeader error={error}>New Transaction</WalletFormHeader>

        <TransactionFormFields type="create"
                               loadAccountOptions={this.loadAccountsOptions}
                               loadCategoriesOptions={this.loadCategoriesOptions}/>

        <CreateFormButtonsGroup cancelTo={{ pathname: '/transactions', query: { page: currentPage } }}
                                submitting={submitting}
                                pristine={pristine}
                                reset={reset}
                                invalid={invalid}
                                error={error} />
      </Form>
    )
  }
}

TransactionCreateForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired
}

export default reduxForm({
  form: 'transactionCreate',
  validate: values => getValidate(values, transactionSchema)
})(TransactionCreateForm)
