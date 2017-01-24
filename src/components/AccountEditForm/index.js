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
    const { error, handleSubmit, account, options, pristine, submitting, reset, invalid } = this.props
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
               options={options} />
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
    );
  }
}

AccountEditForm.PropTypes = {
  account: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired
}

AccountEditForm = reduxForm({
  form: 'accountEdit',
  validate
})(AccountEditForm)

export default AccountEditForm
