import React, { Component, PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import { LinkContainer } from 'react-router-bootstrap'
import {
  Form,
  FormGroup,
  Col,
  Button,
  FormControl
} from 'react-bootstrap'
import {
  fetchCategoriesPageWithDependencies,
  fetchAccountsIfNeeded
} from '../../actions'
import { transactionSchema } from '../../../common/validation'
import {
  RenderField,
  WalletSelect,
  RenderFieldDatetime,
  RenderError,
  getValidate,
  formValidationState
} from '../Common'

const validate = values => getValidate(values, transactionSchema)

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
        <FormGroup validationState={formValidationState(error)}>
          <h1 className="form-signin-heading truncate">Transaction {transaction.id}</h1>
          <FormControl.Feedback />
          <RenderError error={error} />
        </FormGroup>

        {customInitialValues && <Field required={true}
               name="fromAccountId"
               component={WalletSelect}
               label="From Account"
               loadOptions={this.loadFromAccountOptions} />}
        {customInitialValues && <Field required={true}
               name="toAccountId"
               component={WalletSelect}
               label="To Account"
               loadOptions={this.loadToAccountOptions} />}
        <Field required={true}
               name="fromAmount"
               component={RenderField}
               label="From Amount"
               type="number" />
        <Field required={true}
               name="toAmount"
               component={RenderField}
               label="To Amount"
               type="number" />
        <Field required={true}
               name="fromRate"
               component={RenderField}
               label="From Rate"
               type="number" />
        <Field required={true}
               name="toRate"
               component={RenderField}
               label="To Rate"
               type="number" />
        <Field required={true}
               name="date"
               component={RenderFieldDatetime}
               label="Date"
               type="text" />
        {customInitialValues && <Field required={true}
               name="categoryId"
               component={WalletSelect}
               label="Category"
               loadOptions={this.loadCategoriesOptions} />}
        <Field name="description"
               component={RenderField}
               label="Description"
               type="text" />

        <FormGroup>
          <Col smOffset={2} sm={2} xs={3}>
            <LinkContainer to="/transactions">
              <Button>
                Cancel
              </Button>
            </LinkContainer>
          </Col>
          <Col sm={2} xs={3}>
            <LinkContainer to={`/transactions/${transaction.id}/delete`}>
              <Button>
                Delete
              </Button>
            </LinkContainer>
          </Col>
          <Col sm={2} xs={3}>
            <Button type="submit" disabled={submitting || (!error && invalid)}>
              Edit
            </Button>
          </Col>
          <Col sm={2} xs={3}>
            <Button disabled={pristine || submitting}
                    onClick={reset}>
              Clear
            </Button>
          </Col>
        </FormGroup>
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
  validate
})(TransactionEditForm)
