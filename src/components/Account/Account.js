import React, { Component, PropTypes } from 'react';

export default class Account extends Component {
  render() {
    const { account } = this.props;
    return (
      <li className="list-group-item">
        <h4 className="list-group-item-heading">
          {account.name}
        </h4>
        <p className="list-group-item-text">
          {account.description}
        </p>
      </li>
    );
  }
}

Account.propTypes = {
  account: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  })
}
