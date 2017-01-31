import React, { Component, PropTypes } from 'react'
import {
  ListGroup,
  Button
} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { connect } from 'react-redux'
import { Transaction } from '..'
import { WalletPager } from '../Common'
import { fetchTransactionsPageWithDependencies } from '../../actions'

export class Transactions extends Component {
  handlePageChange = (page = 1) => {
    const { dispatch } = this.props
    dispatch(fetchTransactionsPageWithDependencies({ page }))
  }

  render() {
    const {
      transactions,
      accounts,
      categories,
      userCurrencies,
      currencies,
      pages,
      page,
      hasNextPage
    } = this.props
    return (
      <div>
        <h1>
          Transactions
          <LinkContainer to="/transactions/create">
            <Button className="pull-right">Create</Button>
          </LinkContainer>
        </h1>
        {pages &&
          page &&
          pages[page] &&
          <ListGroup>
            {pages[page].ids.map(id => {
              const transaction = transactions[id]
              const fromAccount = transaction && accounts[transaction.fromAccountId]
              const fromAccountUserCurrency = fromAccount && userCurrencies[fromAccount.currencyId]
              const fromAccountCurrency = fromAccountUserCurrency && currencies[fromAccountUserCurrency.currencyId]
              const toAccount = transaction && accounts[transaction.toAccountId]
              const toAccountUserCurrency = toAccount && userCurrencies[toAccount.currencyId]
              const toAccountCurrency = toAccountUserCurrency && currencies[toAccountUserCurrency.currencyId]
              const category = transaction && categories[transaction.categoryId]
              return (
                transaction &&
                toAccount &&
                toAccountUserCurrency &&
                toAccountCurrency &&
                fromAccount &&
                fromAccountUserCurrency &&
                fromAccountCurrency &&
                category &&
                <Transaction key={transaction.id}
                             transaction={transaction}
                             fromAccount={fromAccount}
                             fromAccountCurrency={fromAccountCurrency}
                             toAccount={toAccount}
                             toAccountCurrency={toAccountCurrency}
                             category={category} />
              )
            })}
          </ListGroup>}
        <WalletPager hasPrev={page > 1}
                     hasNext={hasNextPage}
                     page={page}
                     route="/transactions" />
      </div>
    )
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.page !== this.props.page &&
      (!this.props.pages[nextProps.page] || !this.props.pages[nextProps.page].fetching)
    ) {
      this.handlePageChange(nextProps.page)
    }
  }

  componentDidMount() {
    this.handlePageChange()
  }
}

Transactions.propTypes = {
  transactions: PropTypes.object.isRequired,
  accounts: PropTypes.object.isRequired,
  categories: PropTypes.object.isRequired,
  currencies: PropTypes.object.isRequired,
  userCurrencies: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  page: PropTypes.number,
  hasNextPage: PropTypes.bool,
  pages: PropTypes.object
}

function mapStateToProps(state, ownProps) {
  const {
    items: transactions
  }  = state.transactions || {
    items: {}
  }

  const { items: accounts } = state.accounts || { items: {} }
  const { items: categories } = state.categories || { items: {} }
  const { items: currencies } = state.currencies || { items: {} }
  const { items: userCurrencies } = state.userCurrencies || { items: {} }

  const pagination = state.pagination.transactions

  return {
    transactions,
    accounts,
    categories,
    userCurrencies,
    currencies,
    pages: pagination.pages,
    page: parseInt(ownProps.location.query.page, 10) || 1,
    hasNextPage: pagination.hasNextPage
  }
}

export const TransactionsConnected = connect(mapStateToProps)(Transactions)

export default TransactionsConnected
