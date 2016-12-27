import React, { Component, PropTypes } from 'react';
import { Badge } from 'react-bootstrap';
import format from 'date-fns/format';

import './Transaction.css';

export default class Transaction extends Component {
  render() {
    const { transaction, fromAccount, toAccount, category } = this.props;
    const date = format(new Date(transaction.date), 'YYYY-MM-DD HH:mm:ss')
    return (
      <li className="list-group-item">
        <p>
          <Badge bsStyle="danger" pullRight>{transaction.fromAmount}</Badge>
          From {fromAccount.name}
        </p>
        <p>
          <Badge bsStyle="success" pullRight>{transaction.toAmount}</Badge>
          To {toAccount.name}
        </p>
        <p className="list-group-item-text">
          <Badge pullRight>{date}</Badge>
          {category && category.name}
        </p>
        {transaction.description && <p>{transaction.description}</p>}
      </li>
    );
  }
}

Transaction.propTypes = {
  transaction: PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string,
    date: PropTypes.string.isRequired,
    fromAmount: PropTypes.number.isRequired,
    toAmount: PropTypes.number.isRequired
  }).isRequired,
  fromAccount: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  toAccount: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  category: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired
}
