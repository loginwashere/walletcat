import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ListGroup } from 'react-bootstrap';
import Account from '../Account/Account';
import { fetchAccountsIfNeeded } from '../../actions';

export class Accounts extends Component {
  render() {
    const { accounts } = this.props;
    return (
      <div>
        <h1>Accounts</h1>
        <ListGroup>
          {accounts.map(account => {
            return (
              <Account key={account.id}
                       account={account} />
            );
          })}
        </ListGroup>
      </div>
    );
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAccountsIfNeeded());
  }
}

Accounts.propTypes = {
  accounts: PropTypes.array.isRequired,
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

  return {
    isFetching,
    lastUpdated,
    accounts
  };
}

export default connect(mapStateToProps)(Accounts);
