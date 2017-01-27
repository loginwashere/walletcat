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
import { accountSchema } from '../../../common/validation'
import { RenderField, RenderError, RenderFieldSelect, getValidate } from '../Common'

const validate = values => getValidate(values, accountSchema)

class AccountEditForm extends Component {
  render() {
    const { error, handleSubmit, account, pristine, submitting, reset, invalid, currencyOptions } = this.props
    const validationState = error => (error && 'error') || null
    return (
      <Form horizontal
            onSubmit={handleSubmit}>
        <FormGroup validationState={validationState(error)}>
          <h1 className="form-signin-heading truncate">Account {account.name}</h1>
          <FormControl.Feedback />
          <RenderError error={error} />
        </FormGroup>

        <Field autoFocus={true}
               required={true}
               name="name"
               component={RenderField}
               label="Name"
               type="text" />
        <Field required={true}
               name="currencyId"
               component={RenderFieldSelect}
               label="Currency"
               type="select"
               options={currencyOptions} />
        <Field name="amount"
               component={RenderField}
               label="Amount"
               type="number" />
        <Field name="description"
               component={RenderField}
               label="Description"
               type="text" />

        <FormGroup>
          <Col smOffset={2} sm={2} xs={3}>
            <LinkContainer to="/accounts">
              <Button>
                Cancel
              </Button>
            </LinkContainer>
          </Col>
          <Col sm={2} xs={3}>
            <LinkContainer to={`/accounts/${account.id}/delete`}>
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

AccountEditForm.propTypes = {
  account: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  currencyOptions: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func.isRequired.isRequired,
  error: PropTypes.object,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired
}
export default reduxForm({
  form: 'accountEdit',
  validate
})(AccountEditForm)
