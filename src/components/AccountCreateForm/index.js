import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form'
import { LinkContainer } from 'react-router-bootstrap';
import {
  Form,
  FormGroup,
  Col,
  FormControl,
  Button,
  ControlLabel
} from 'react-bootstrap';

class AccountCreateForm extends Component {
  render() {
    const { currencies, userCurrencies, userCurrencyIds } = this.props;
    const { handleSubmit, pristine, reset, submitting } = this.props
    return (
      <Form horizontal
            onSubmit={handleSubmit}>
        <FormGroup controlId="formHorizontalName">
          <Col componentClass={ControlLabel} sm={2}>
            Name
          </Col>
          <Col sm={10}>
            <Field required
                   component="input"
                   type="text"
                   className="form-control"
                   placeholder="Name"
                   name="name" />
            <FormControl.Feedback />
          </Col>
        </FormGroup>

        <FormGroup controlId="formControlsSelect">
          <Col componentClass={ControlLabel} sm={2}>
            Currency
          </Col>
          <Col sm={10}>
            <Field required
                   component="select"
                   type="text"
                   className="form-control"
                   placeholder="Currency"
                   name="currencyId">
              <option value="0" key={0}>Select Currency</option>
              {userCurrencyIds.map(userCurrencyId => {
                  const userCurrency = userCurrencies[userCurrencyId];
                  const currency = currencies[userCurrency.currencyId];
                  return (
                    <option value={userCurrency.id}
                            key={userCurrency.id}>{currency.name}</option>
                  )
              })}
            </Field>
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalDescription">
          <Col componentClass={ControlLabel} sm={2}>
            Description
          </Col>
          <Col sm={10}>
            <Field component="input"
                   type="text"
                   className="form-control"
                   placeholder="Description"
                   name="description" />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalDescription">
          <Col componentClass={ControlLabel} sm={2}>
            Amount
          </Col>
          <Col sm={10}>
            <Field required
                   component="input"
                   type="number"
                   className="form-control"
                   placeholder="Amount"
                   name="amount" />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={2} xs={4}>
            <LinkContainer to="/accounts">
              <Button type="submit" disabled={submitting}>
                Cancel
              </Button>
            </LinkContainer>
          </Col>
          <Col sm={2} xs={4}>
            <Button type="submit" disabled={submitting}>
              Create
            </Button>
          </Col>
          <Col sm={2} xs={4}>
            <Button type="submit"
                    disabled={pristine || submitting}
                    onClick={reset}>
              Clear
            </Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

AccountCreateForm.PropTypes = {
  userCurrencies: PropTypes.object.isRequired,
  userCurrencyIds: PropTypes.array.isRequired,
  currencies: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

AccountCreateForm = reduxForm({
  form: 'accountCreate'
})(AccountCreateForm);

export default AccountCreateForm;
