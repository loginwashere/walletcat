import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  ListGroup,
  Button
} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Account } from '..'
import { WalletPager } from '../Common'
import {
  fetchAccountsPageWithDependenies
} from '../../actions'

export class Accounts extends Component {
  handlePageChange = (page = 1) => {
    const { dispatch } = this.props
    dispatch(fetchAccountsPageWithDependenies({ page }))
  }

  render() {
    const {
      accounts,
      currencies,
      userCurrencies,
      pages,
      hasNextPage,
      page
    } = this.props
    return (
      <div>
        <h1>
          Accounts
          <LinkContainer to="/accounts/create">
            <Button className="pull-right">Create</Button>
          </LinkContainer>
        </h1>
        {pages &&
          page &&
          pages[page] &&
          <ListGroup>
            {pages[page].ids.map(id => {
              const account = accounts[id]
              if (account) {
                const accountUserCurrency = userCurrencies[account.currencyId]
                const accountCurrency = accountUserCurrency && currencies[accountUserCurrency.currencyId]
                return (
                  account &&
                  accountUserCurrency &&
                  accountCurrency &&
                  <Account key={account.id}
                          account={account}
                          accountCurrency={accountCurrency} />
                )
              }
            })}
          </ListGroup>}
        <WalletPager hasPrev={page > 1}
                     hasNext={hasNextPage}
                     page={page}
                     route="/accounts" />
      </div>
    )
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.page !== this.props.page && !nextProps.fetching) {
      this.handlePageChange(nextProps.page)
    }
  }

  componentDidMount() {
    this.handlePageChange(this.props.page)
  }
}

Accounts.propTypes = {
  accounts: PropTypes.object.isRequired,
  userCurrencies: PropTypes.object.isRequired,
  currencies: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  hasNextPage: PropTypes.bool,
  pages: PropTypes.object,
  page: PropTypes.number
}

function mapStateToProps(state, ownProps) {
  const {
    items: accounts,
  }  = state.accounts || {
    items: {}
  }
  const { items: currencies } = state.currencies || { items: [] }
  const {
    items: userCurrencies,
  } = state.userCurrencies || {
    items: {}
  }
  const pagination = state.pagination.accounts

  return {
    accounts,
    currencies,
    userCurrencies,
    pages: pagination.pages,
    page: parseInt(ownProps.location.query.page, 10) || 1,
    hasNextPage: pagination.hasNextPage
  }
}

export default connect(mapStateToProps)(Accounts)
