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
import { transactionSchema } from '../../../common/validation'
import {
  RenderField,
  RenderFieldSelect,
  RenderFieldDatetime,
  RenderError,
  getValidate
} from '../Common'

const validate = values => getValidate(values, transactionSchema)

class TransactionEditForm extends Component {
  render() {
    const {
      error,
      handleSubmit,
      submitting,
      transaction,
      accountOptions,
      categoryOptions,
      pristine,
      reset,
      invalid
    } = this.props
    const validationState = error => (error && 'error') || null
    return (
      <Form horizontal
            onSubmit={handleSubmit}>
        <FormGroup validationState={validationState(error)}>
          <h1 className="form-signin-heading truncate">Transaction {transaction.id}</h1>
          <FormControl.Feedback />
          <RenderError error={error} />
        </FormGroup>

        <Field required={true}
               autoFocus={true}
               name="fromAccountId"
               component={RenderFieldSelect}
               label="From Account"
               type="select"
               options={accountOptions} />
        <Field required={true}
               name="toAccountId"
               component={RenderFieldSelect}
               label="To Account"
               type="select"
               options={accountOptions} />
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
               component={RenderFieldSelect}
               label="Category"
               type="select"
               options={categoryOptions} />
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
  transaction: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  accountOptions: PropTypes.array.isRequired,
  categoryOptions: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func.isRequired.isRequired,
  error: PropTypes.object,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'transactionEdit',
  validate
})(TransactionEditForm)
