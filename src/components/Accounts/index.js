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
    const {
      accounts,
      accountIds,
      currencies,
      userCurrencies
    } = this.props;
    return (
      <div>
        <h1>
          Accounts
          <LinkContainer to="/accounts/create">
            <Button className="pull-right">Create</Button>
          </LinkContainer>
        </h1>
        <ListGroup>
          {accountIds.map(id => {
            const account = accounts[id];
            const accountUserCurrency = userCurrencies[account.currencyId];
            const accountCurrency = accountUserCurrency && currencies[accountUserCurrency.currencyId];
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
  accounts: PropTypes.object.isRequired,
  accountIds: PropTypes.array.isRequired,
  userCurrencies: PropTypes.object.isRequired,
  currencies: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const {
    isFetching,
    lastUpdated,
    items: accounts,
    itemIds: accountIds
  }  = state.accounts || {
    isFetching: true,
    items: {},
    itemIds: []
  }
  const { items: currencies } = state.currencies || { items: [] };
  const {
    items: userCurrencies,
  } = state.userCurrencies || {
    items: {}
  };

  return {
    isFetching,
    lastUpdated,
    accounts,
    accountIds,
    currencies,
    userCurrencies
  };
}

export const AccountsConnected = connect(mapStateToProps)(Accounts);

export default AccountsConnected;
