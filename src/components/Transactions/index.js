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
          {transactions.map(transaction => {
            const fromAccount = accounts
              .filter(account => account.id === transaction.fromAccountId)[0];
            const fromAccountUserCurrency = fromAccount && userCurrencies
              .filter(item => item.id === fromAccount.currencyId)[0];
            const fromAccountCurrency = fromAccountUserCurrency && currencies
              .filter(item => item.id === fromAccountUserCurrency.currencyId)[0];
            const toAccount = accounts
              .filter(account => account.id === transaction.toAccountId)[0];
            const toAccountUserCurrency = toAccount && userCurrencies
              .filter(item => item.id === toAccount.currencyId)[0];
            const toAccountCurrency = toAccountUserCurrency && currencies
              .filter(item => item.id === toAccountUserCurrency.currencyId)[0];
            const category = categories
              .filter(category => category.id === transaction.categoryId)[0];
            console.log(
              [fromAccount,fromAccountUserCurrency,fromAccountCurrency,toAccount,toAccountUserCurrency,toAccountCurrency,category]
            )
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
  transactions: PropTypes.array.isRequired,
  accounts: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  currencies: PropTypes.array.isRequired,
  userCurrencies: PropTypes.array.isRequired,
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
  const { items: currencies } = state.currencies || { items: [] };
  const { items: userCurrencies } = state.userCurrencies || { items: [] };

  return {
    isFetching,
    lastUpdated,
    transactions,
    accounts,
    categories,
    userCurrencies,
    currencies
  };
}

export const TransactionsConnected = connect(mapStateToProps)(Transactions);

export default TransactionsConnected;
