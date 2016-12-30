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
    const { transactions, accounts, categories } = this.props;
    return (
      <div>
        <h1>
          Transactions
          <LinkContainer to="/transactions/create">
            <Button className="pull-right">Create</Button>
          </LinkContainer>
        </h1>
        <ListGroup>
          {transactions.map(transaction => {
            const fromAccount = accounts
              .filter(account => account.id === transaction.fromAccountId)[0];
            const toAccount = accounts
              .filter(account => account.id === transaction.toAccountId)[0];
            const category = categories
              .filter(category => category.id === transaction.categoryId)[0];
            return (
              transaction
              && toAccount
              && fromAccount
              && category
              && <Transaction key={transaction.id}
                              transaction={transaction}
                              fromAccount={fromAccount}
                              toAccount={toAccount}
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
  transactions: PropTypes.array.isRequired,
  accounts: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const {
    isFetching,
    lastUpdated,
    items: transactions
  }  = state.transactions || {
    isFetching: true,
    items: []
  }

  const { items: accounts } = state.accounts || { items: [] };
  const { items: categories } = state.categories || { items: [] };

  return {
    isFetching,
    lastUpdated,
    transactions,
    accounts,
    categories
  };
}

export const TransactionsConnected = connect(mapStateToProps)(Transactions);

export default TransactionsConnected;
