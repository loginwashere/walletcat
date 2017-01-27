import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { Badge } from 'react-bootstrap'
import format from 'date-fns/format'

import './style.less'

export class Transaction extends Component {
  render() {
    const {
      transaction,
      fromAccount,
      fromAccountCurrency,
      toAccount,
      toAccountCurrency,
      category
    } = this.props
    const date = format(new Date(transaction.date), 'YYYY-MM-DD HH:mm:ss')
    return (
      <Link to={`/transactions/${transaction.id}`}
            className="list-group-item">
        <p className="list-group-item-text truncate">
          <Badge bsStyle="danger" pullRight>
            {transaction.fromAmount} {fromAccountCurrency.name}
          </Badge>
          From <b>{fromAccount.name}</b>
        </p>
        <p className="list-group-item-text truncate">
          <Badge bsStyle="success" pullRight>
            {transaction.toAmount} {toAccountCurrency.name}
          </Badge>
          To <b>{toAccount.name}</b>
        </p>
        <p className="list-group-item-text truncate">
          <Badge pullRight>{date}</Badge>
          <b>{category.name}</b>
        </p>
        {transaction.description && <p className="list-group-item-text truncate">{transaction.description}</p>}
      </Link>
    )
  }
}

Transaction.propTypes = {
  transaction: PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string,
    date: PropTypes.string.isRequired,
    fromAmount: PropTypes.string.isRequired,
    toAmount: PropTypes.string.isRequired
  }).isRequired,
  fromAccount: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  fromAccountCurrency: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  toAccount: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  toAccountCurrency: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  category: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired
}

export default Transaction
