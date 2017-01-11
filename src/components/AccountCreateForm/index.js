import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form'
import { LinkContainer } from 'react-router-bootstrap';
import {
  Form,
  FormGroup,
  Col,
  Button
} from 'react-bootstrap';
import { RenderField, RenderFieldSelect } from '../Common';

class AccountCreateForm extends Component {
  render() {
    const { currencies, userCurrencies, userCurrencyIds } = this.props;
    const { handleSubmit, pristine, reset, submitting } = this.props
    const options = userCurrencyIds.map(userCurrencyId => {
        const userCurrency = userCurrencies[userCurrencyId];
        const currency = currencies[userCurrency.currencyId];
        return {id: userCurrencyId, name: currency.name};
    });
    return (
      <Form horizontal
            onSubmit={handleSubmit}>

        <Field name="name" component={RenderField} label="Name" type="text" />
        <Field name="currencyId" component={RenderFieldSelect} label="Currency" type="select" options={options} />
        <Field name="amount" component={RenderField} label="Amount" type="number" />
        <Field name="description" component={RenderField} label="Description" type="text" />

        <FormGroup>
          <Col smOffset={2} sm={2} xs={4}>
            <LinkContainer to="/accounts">
              <Button disabled={submitting}>
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
