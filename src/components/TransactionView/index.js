import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  updateTransaction,
  fetchTransactionsAccountsCategoriesIfNeeded
} from '../../actions';
import TransactionEditForm from '../TransactionEditForm';

class TransactionView extends Component {
  handleSubmit = (values) => {
    const { dispatch, transaction: { id } } = this.props;
    dispatch(updateTransaction(id, values));
  }

  render() {
    const { transaction, initialValues, accountOptions, categoryOptions } = this.props;
    return (
      <div>
        <h1>Transaction {transaction.id}</h1>
        <TransactionEditForm onSubmit={this.handleSubmit}
                          transaction={transaction}
                          initialValues={initialValues}
                          enableReinitialize={true}
                          accountOptions={accountOptions}
                          categoryOptions={categoryOptions} />
      </div>
    );
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchTransactionsAccountsCategoriesIfNeeded());
  }
}

TransactionView.propTypes = {
  transaction: PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string
  }).isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state, ownProps) {
  const transaction = state.transactions.items[ownProps.params.transactionId] || {};

  const { items: accounts, itemIds: accountIds } = state.accounts || { items: {}, itemIds: [] };
  const { items: categories, itemIds: categoryIds } = state.categories || { items: {}, itemIds: [] };

  const accountOptions = accountIds.map(id => accounts[id]);
  const categoryOptions = categoryIds.map(id => categories[id]);

  return {
    transaction,
    initialValues: transaction,
    accountOptions,
    categoryOptions
  };
}

TransactionView = connect(mapStateToProps)(TransactionView);

export default TransactionView;
