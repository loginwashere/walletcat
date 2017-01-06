import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Badge } from 'react-bootstrap';

export class Account extends Component {
  render() {
    const { account, accountCurrency } = this.props;
    return (
      <Link to={`/accounts/${account.id}`}
            className="list-group-item">
        <Badge bsStyle="danger" pullRight>
          {account.amount} {accountCurrency.name}
        </Badge>
        <h4 className="list-group-item-heading">
          {account.name}
        </h4>
        <p className="list-group-item-text">
          {account.description}
        </p>
      </Link>
    );
  }
}

Account.propTypes = {
  account: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    amount: PropTypes.number.isRequired
  }).isRequired,
  accountCurrency: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired
}

export default Account;
