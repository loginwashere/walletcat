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
      invalid
    } = this.props
    return (
      <Form horizontal
            onSubmit={handleSubmit}>
        <FormGroup validationState={formValidationState(error)}>
          <h1 className="form-signin-heading">New Transaction</h1>
          <FormControl.Feedback />
          <RenderError error={error} />
        </FormGroup>

        <Field required={true}
               name="fromAccountId"
               component={WalletSelect}
               label="From Account"
               loadOptions={this.loadAccountsOptions} />
        <Field required={true}
               name="toAccountId"
               component={WalletSelect}
               label="To Account"
               loadOptions={this.loadAccountsOptions} />
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
        <Field required={true}
               name="categoryId"
               component={WalletSelect}
               label="Category"
               loadOptions={this.loadCategoriesOptions} />
        <Field name="description"
               component={RenderField}
               label="Description"
               type="text" />

        <FormGroup>
          <Col smOffset={2} sm={2} xs={4}>
            <LinkContainer to="/transactions">
              <Button disabled={submitting}>
                Cancel
              </Button>
            </LinkContainer>
          </Col>
          <Col sm={2} xs={4}>
            <Button type="submit" disabled={submitting || (!error && invalid)}>
              Create
            </Button>
          </Col>
          <Col sm={2} xs={4}>
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

TransactionCreateForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'transactionCreate',
  validate
})(TransactionCreateForm)
