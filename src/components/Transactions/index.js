import React, { Component, PropTypes } from 'react';
import {
  ListGroup,
  Button
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import { Transaction } from '..';
import { fetchTransactionsAccountsCategoriesIfNeeded } from '../../actions';

export class Transactions extends Component {
  render() {
    const {
      transactions,
      transactionIds,
      accounts,
      categories,
      userCurrencies,
      currencies
    } = this.props;
    return (
      <div>
        <h1>
          Transactions
          <LinkContainer to="/transactions/create">
            <Button className="pull-right">Create</Button>
          </LinkContainer>
        </h1>
        <ListGroup>
          {transactionIds.map(id => {
            const transaction = transactions[id];
            const fromAccount = transaction && accounts[transaction.fromAccountId];
            const fromAccountUserCurrency = fromAccount && userCurrencies[fromAccount.currencyId];
            const fromAccountCurrency = fromAccountUserCurrency && currencies[fromAccountUserCurrency.currencyId];
            const toAccount = transaction && accounts[transaction.toAccountId];
            const toAccountUserCurrency = toAccount && userCurrencies[toAccount.currencyId];
            const toAccountCurrency = toAccountUserCurrency && currencies[toAccountUserCurrency.currencyId];
            const category = transaction && categories[transaction.categoryId];
            return (
              transaction
              && toAccount
              && toAccountUserCurrency
              && toAccountCurrency
              && fromAccount
              && fromAccountUserCurrency
              && fromAccountCurrency
              && category
              && <Transaction key={transaction.id}
                              transaction={transaction}
                              fromAccount={fromAccount}
                              fromAccountCurrency={fromAccountCurrency}
                              toAccount={toAccount}
                              toAccountCurrency={toAccountCurrency}
                              category={category} />
            );
          })}
        </ListGroup>
      </div>
    );
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchTransactionsAccountsCategoriesIfNeeded());
  }
}

Transactions.propTypes = {
  transactions: PropTypes.object.isRequired,
  transactionIds: PropTypes.array.isRequired,
  accounts: PropTypes.object.isRequired,
  categories: PropTypes.object.isRequired,
  currencies: PropTypes.object.isRequired,
  userCurrencies: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const {
    isFetching,
    lastUpdated,
    items: transactions,
    itemIds: transactionIds
  }  = state.transactions || {
    isFetching: true,
    items: {},
    itemIds: []
  }

  const { items: accounts } = state.accounts || { items: {} };
  const { items: categories } = state.categories || { items: {} };
  const { items: currencies } = state.currencies || { items: {} };
  const { items: userCurrencies } = state.userCurrencies || { items: {} };

  return {
    isFetching,
    lastUpdated,
    transactions,
    transactionIds,
    accounts,
    categories,
    userCurrencies,
    currencies
  };
}

export const TransactionsConnected = connect(mapStateToProps)(Transactions);

export default TransactionsConnected;
