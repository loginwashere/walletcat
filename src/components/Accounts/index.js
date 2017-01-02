import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  ListGroup,
  Button
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Account } from '..';
import { fetchAccountsAndAppAndUserCurrenciesIfNeeded } from '../../actions';

export class Accounts extends Component {
  render() {
    const { accounts, currencies, userCurrencies } = this.props;
    return (
      <div>
        <h1>
          Accounts
          <LinkContainer to="/accounts/create">
            <Button className="pull-right">Create</Button>
          </LinkContainer>
        </h1>
        <ListGroup>
          {accounts.map(account => {
            const accountUserCurrency = userCurrencies
              .filter(item => item.id === account.currencyId)[0];
            const accountCurrency = accountUserCurrency && currencies
              .filter(item => item.id === accountUserCurrency.currencyId)[0];
            return (
              account
              && accountUserCurrency
              && accountCurrency
              && <Account key={account.id}
                       account={account}
                       accountCurrency={accountCurrency} />
            );
          })}
        </ListGroup>
      </div>
    );
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAccountsAndAppAndUserCurrenciesIfNeeded());
  }
}

Accounts.propTypes = {
  accounts: PropTypes.array.isRequired,
  userCurrencies: PropTypes.array.isRequired,
  currencies: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  const {
    isFetching,
    lastUpdated,
    items: accounts
  }  = state.accounts || {
    isFetching: true,
    items: []
  }
  const { items: currencies } = state.currencies || { items: [] };
  const { items: userCurrencies } = state.userCurrencies || { items: [] };

  return {
    isFetching,
    lastUpdated,
    accounts,
    currencies,
    userCurrencies
  };
}

export const AccountsConnected = connect(mapStateToProps)(Accounts);

export default AccountsConnected;
