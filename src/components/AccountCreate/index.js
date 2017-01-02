import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
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
  createAccount,
  fetchAppAndUserCurrenciesIfNeeded
} from '../../actions';

export class AccountCreate extends Component {
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
    const { currencies, userCurrencies } = this.props;
    return (
      <div>
        <h1>New Account</h1>
        <Form horizontal
              onSubmit={this.handleSubmit}>
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
                {userCurrencies.map(userCurrency => {
                  const currency = currencies
                    .filter(currency => currency.id === userCurrency.currencyId)[0];
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
            <Col smOffset={2} sm={2} xs={6}>
              <LinkContainer to="/accounts">
                <Button type="submit">
                  Cancel
                </Button>
              </LinkContainer>
            </Col>
            <Col sm={2} xs={6}>
              <Button type="submit">
                Create
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAppAndUserCurrenciesIfNeeded());
  }
}

AccountCreate.PropTypes = {
  userCurrencies: PropTypes.array.isRequired,
  currencies: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { items: currencies } = state.currencies || { items: [] };
  const { items: userCurrencies } = state.userCurrencies || { items: [] };

  return {
    currencies,
    userCurrencies
  }
}

export const AccountCreateConnected = connect(mapStateToProps)(AccountCreate);

export default AccountCreateConnected;
