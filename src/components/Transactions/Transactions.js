import React, { Component, PropTypes } from 'react';
import {
  ListGroup,
  Button
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import Transaction from '../Transaction/Transaction';
import {
  fetchTransactionsIfNeeded,
  fetchAccountsIfNeeded,
  fetchCategoriesIfNeeded
} from '../../actions';

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
              <Transaction key={transaction.id}
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
    dispatch(fetchTransactionsIfNeeded());
    dispatch(fetchAccountsIfNeeded());
    dispatch(fetchCategoriesIfNeeded());
  }
}

Transactions.propTypes = {
  transactions: PropTypes.array.isRequired,
  accounts: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired
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

export default connect(mapStateToProps)(Transactions);
