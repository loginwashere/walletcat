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

class AccountCreateForm extends Component {
  render() {
    const {
      currencies,
      userCurrencies,
      userCurrencyIds,
      error,
      handleSubmit,
      pristine,
      reset,
      submitting,
      invalid
    } = this.props
    const options = userCurrencyIds.map(userCurrencyId => {
      const userCurrency = userCurrencies[userCurrencyId]
      const currency = currencies[userCurrency.currencyId]
      return { id: userCurrencyId, name: currency.name }
    })
    const validationState = error => (error && 'error') || null
    return (
      <Form horizontal
            onSubmit={handleSubmit}>
        <FormGroup validationState={validationState(error)}>
          <h1 className="form-signin-heading">New Account</h1>
          <FormControl.Feedback />
          <RenderError error={error} />
        </FormGroup>

        <Field required={true}
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
          <Col smOffset={2} sm={2} xs={4}>
            <LinkContainer to="/accounts">
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

AccountCreateForm.propTypes = {
  userCurrencies: PropTypes.object.isRequired,
  userCurrencyIds: PropTypes.array.isRequired,
  currencies: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'accountCreate',
  validate
})(AccountCreateForm)
