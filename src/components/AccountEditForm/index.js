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
import { fetchAppCurrenciesPageWithDependencies } from '../../actions'
import { RenderField, RenderError, WalletSelect, getValidate } from '../Common'

const validate = values => getValidate(values, accountSchema)

class AccountEditForm extends Component {
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
    const { error, handleSubmit, account, pristine, submitting, reset, invalid } = this.props
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
               component={WalletSelect}
               label="Currency"
               loadOptions={this.loadUserCurrenciesOptions}  />
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
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
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
