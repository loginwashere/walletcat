import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export class Account extends Component {
  render() {
    const { account } = this.props;
    return (
      <Link to={`/accounts/${account.id}`}
            className="list-group-item">
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
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string
  }).isRequired
}

export default Account;
