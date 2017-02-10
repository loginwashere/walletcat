import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { Badge, Row, Col } from 'react-bootstrap'
import format from 'date-fns/format'

import './style.less'

const TransactionItem = ({ transactionItem, account, currency, type, first }) => (
  <Row>
    {first && <Col sm={1} xs={3}>
      {type === 'credit'
        ? 'From'
        : 'To'}
    </Col>}
    <Col sm={9}
         smOffset={!first
          ? 1
          : 0}
         xs={7}
         xsOffset={!first
          ? 3
          : 9}><b>{account.name}</b></Col>
    <Col sm={2} xs={2}>
      <Badge bsStyle={type === 'credit'
              ? 'danger'
              : 'success'}
             pullRight>
        {transactionItem.amount} {currency.name}
      </Badge>
    </Col>
  </Row>
)

TransactionItem.propTypes = {
  transactionItem: PropTypes.shape({
    amount: PropTypes.string.isRequired
  }).isRequired,
  account: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  currency: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  type: PropTypes.string.isRequired,
  first: PropTypes.bool
}

const TransactionItemList = ({
  transactionItemIds,
  transactionItems,
  accounts,
  userCurrencies,
  currencies,
  className,
  type
}) => (
  <div className={className}>
    {transactionItemIds.map((transactionItemId, index) => {
      const transactionItem = transactionItems[transactionItemId]
      const account = transactionItem && accounts[transactionItem.accountId]
      const userCurrency = account && userCurrencies[account.currencyId]
      const currency = userCurrency && currencies[userCurrency.currencyId]
      return (
        transactionItem &&
        account &&
        currency &&
        <TransactionItem key={transactionItem.id}
                         transactionItem={transactionItem}
                         account={account}
                         currency={currency}
                         type={type}
                         first={index === 0} />
      )
    })}
  </div>
)

TransactionItemList.propTypes = {
  transactionItemIds: PropTypes.array.isRequired,
  transactionItems: PropTypes.object,
  accounts: PropTypes.object,
  userCurrencies: PropTypes.object,
  currencies: PropTypes.object,
  className: PropTypes.string,
  type: PropTypes.string.isRequired
}

export class Transaction extends Component {
  render() {
    const {
      transaction,
      accounts,
      transactionItems,
      userCurrencies,
      currencies,
      category
    } = this.props
    const debitTransactionItemIds = transaction.transactionItems
      .filter(transactionItemId => transactionItems[transactionItemId] &&
        transactionItems[transactionItemId].type === 'debit')
    const creditTransactionItemIds = transaction.transactionItems
      .filter(transactionItemId => transactionItems[transactionItemId] &&
        transactionItems[transactionItemId].type === 'credit')
    const date = format(new Date(transaction.date), 'YYYY-MM-DD HH:mm:ss')
    return (
      <Link to={`/transactions/${transaction.id}`}
            className="list-group-item">
        <TransactionItemList className="list-group-item-text truncate"
                             transactionItemIds={creditTransactionItemIds}
                             accounts={accounts}
                             userCurrencies={userCurrencies}
                             currencies={currencies}
                             transactionItems={transactionItems}
                             type={'credit'} />
        <TransactionItemList className="list-group-item-text truncate"
                             transactionItemIds={debitTransactionItemIds}
                             accounts={accounts}
                             userCurrencies={userCurrencies}
                             currencies={currencies}
                             transactionItems={transactionItems}
                             type={'debit'} />
        <div className="list-group-item-text truncate">
          <Row>
            <Col sm={1} xs={3}>Category</Col>
            <Col sm={9} xs={6}><b>{category.name}</b></Col>
            <Col sm={2} xs={3}>
              <Badge pullRight>{date}</Badge>
            </Col>
          </Row>
        </div>
        {transaction.description && <div className="list-group-item-text truncate">
            <Row>
              <Col sm={1} xs={12}>Description</Col>
              <Col sm={11} xs={12}>{transaction.description}</Col>
            </Row>
          </div>}
      </Link>
    )
  }
}

Transaction.propTypes = {
  transaction: PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string,
    date: PropTypes.string.isRequired,
    fromAmount: PropTypes.string,
    toAmount: PropTypes.string
  }).isRequired,
  accounts: PropTypes.object,
  transactionItems: PropTypes.object,
  userCurrencies: PropTypes.object,
  currencies: PropTypes.object,
  category: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired
}

export default Transaction
