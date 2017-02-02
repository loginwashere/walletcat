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
import { fetchAppCurrenciesPageWithDependencies } from '../../actions'
import { accountSchema } from '../../../common/validation'
import { RenderField, RenderError, WalletSelect, getValidate } from '../Common'

const validate = values => getValidate(values, accountSchema)

class AccountCreateForm extends Component {
  prepareUserCurrenciesOptions = result => {
    const options = result.userCurrencies
      .map(userCurrency => {
        const currency = result.currencies.filter(currency => currency.id === userCurrency.currencyId)[0]
        if (userCurrency && currency) {
          return { value: userCurrency.id, label: currency.name }
        }
      })
      .filter(Boolean)
    return { options }
  }

  loadUserCurrenciesOptions = (value) => {
    const { dispatch } = this.props
    return dispatch(fetchAppCurrenciesPageWithDependencies({ filter: { name: value } }))
      .then(this.prepareUserCurrenciesOptions)
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
               component={WalletSelect}
               label="Currency"
               loadOptions={this.loadUserCurrenciesOptions} />
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
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  dispatch: PropTypes.func
}

export default reduxForm({
  form: 'accountCreate',
  validate
})(AccountCreateForm)
