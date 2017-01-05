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
import {
  createAccount
} from '../../actions';

export class AccountCreateForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      currencyId: '',
      amount: 0
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { dispatch } = this.props;
    const params = {
      name: this.state.name,
      description: this.state.description,
      currencyId: parseInt(this.state.currencyId, 10),
      amount: this.state.amount
    };

    dispatch(createAccount(params));
  }

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  }

  handleDescriptionChange = (e) => {
    this.setState({ description: e.target.value });
  }

  handleCurrencyChange = (e) => {
    this.setState({ currencyId: e.target.value });
  }

  handleAmountChange = (e) => {
    this.setState({ amount: e.target.value });
  }

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
            <FormControl required
                         type="text"
                         placeholder="Name"
                         onChange={this.handleNameChange}
                         value={this.state.name} />
            <FormControl.Feedback />
          </Col>
        </FormGroup>

        <FormGroup controlId="formControlsSelect">
          <Col componentClass={ControlLabel} sm={2}>
            Currency
          </Col>
          <Col sm={10}>
            <FormControl componentClass="select"
                         placeholder="Currency"
                         onChange={this.handleCurrencyChange}
                         value={this.state.currencyId}>
              <option value="0" key={0}>Select Currency</option>
              {userCurrencyIds.map(userCurrencyId => {
                  const userCurrency = userCurrencies[userCurrencyId];
                  const currency = currencies[userCurrency.currencyId];
                  return (
                    <option value={userCurrency.id}
                            key={userCurrency.id}>{currency.name}</option>
                  )
              })}
            </FormControl>
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalDescription">
          <Col componentClass={ControlLabel} sm={2}>
            Description
          </Col>
          <Col sm={10}>
            <FormControl type="text"
                         placeholder="Description"
                         onChange={this.handleDescriptionChange}
                         value={this.state.description} />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalDescription">
          <Col componentClass={ControlLabel} sm={2}>
            Amount
          </Col>
          <Col sm={10}>
            <FormControl type="number"
                          placeholder="Amount"
                          onChange={this.handleAmountChange}
                          value={this.state.amount} />
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
            <Button type="submit" disabled={pristine || submitting} onClick={reset}>
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
  dispatch: PropTypes.func.isRequired
}

export const AccountCreateFormConnected = reduxForm({
  form: 'accountCreate'
})(AccountCreateForm);

export default AccountCreateFormConnected;
