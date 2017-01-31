import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { WalletPager } from '../Common'
import UserCurrenciesPage from '../UserCurrenciesPage'
import { fetchUserCurrenciesPageWithDependencies } from '../../actions'

export class UserCurrencies extends Component {
  handlePageChange = (page = 1) => {
    const { dispatch } = this.props
    dispatch(fetchUserCurrenciesPageWithDependencies({ page }))
  }

  render() {
    const {
      currencies,
      userCurrencies,
      dispatch,
      page,
      pages,
      hasNextPage,
    } = this.props
    return (
      <div>
        <h1>User Currencies</h1>
        {page &&
          pages &&
          pages[page] &&
          <UserCurrenciesPage userCurrencyIds={pages[page].ids}
                              currencies={currencies}
                              userCurrencies={userCurrencies}
                              dispatch={dispatch} />}
        <WalletPager hasPrev={page > 1}
                     hasNext={hasNextPage}
                     page={page}
                     route="/currencies/user" />
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

UserCurrencies.propTypes = {
  currencies: PropTypes.object.isRequired,
  userCurrencies: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  page: PropTypes.number,
  hasNextPage: PropTypes.bool,
  pages: PropTypes.object
}

function mapStateToProps(state, ownProps) {
  const {
    items: currencies,
  }  = state.currencies || {
    items: {}
  }

  const {
    items: userCurrencies
  } = state.userCurrencies || {
    items: {}
  }
  const pagination = state.pagination.userCurrencies

  return {
    currencies,
    userCurrencies,
    pages: pagination.pages,
    page: parseInt(ownProps.location.query.page, 10) || 1,
    hasNextPage: pagination.hasNextPage
  }
}

export default connect(mapStateToProps)(UserCurrencies)
