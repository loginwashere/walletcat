import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { WalletPager } from '../Common'
import AppCurrenciesPage from '../AppCurrenciesPage'
import { fetchAppCurrenciesPageWithDependencies } from '../../actions'

export class AppCurrencies extends Component {
  handlePageChange = (page = 1) => {
    const { dispatch } = this.props
    dispatch(fetchAppCurrenciesPageWithDependencies({ page }))
  }

  render() {
    const {
      currencies,
      userCurrencies,
      userCurrenciesIdsByCurrencyId,
      dispatch,
      page,
      hasNextPage,
      pages
    } = this.props
    return (
      <div>
        <h1>App Currencies</h1>
        {page &&
          pages &&
          pages[page] &&
          <AppCurrenciesPage currencyIds={pages[page].ids}
                             currencies={currencies}
                             userCurrencies={userCurrencies}
                             userCurrenciesIdsByCurrencyId={userCurrenciesIdsByCurrencyId}
                             dispatch={dispatch} />}
        <WalletPager hasPrev={page > 1}
                     hasNext={hasNextPage}
                     page={page}
                     route="/currencies/app" />
      </div>
    )
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.page !== this.props.page && !nextProps.fetching) {
      this.handlePageChange(nextProps.page)
    }
  }

  componentDidMount() {
    this.handlePageChange()
  }
}

AppCurrencies.propTypes = {
  currencies: PropTypes.object.isRequired,
  userCurrencies: PropTypes.object.isRequired,
  userCurrenciesIdsByCurrencyId: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  hasNextPage: PropTypes.bool,
  pages: PropTypes.object,
  page: PropTypes.number
}

function mapStateToProps(state, ownProps) {
  const {
    items: currencies
  }  = state.currencies || {
    items: {}
  }

  const {
    items: userCurrencies,
    itemsByCurrencyId: userCurrenciesIdsByCurrencyId
  } = state.userCurrencies || {
    items: {},
    itemsByCurrencyId: {}
  }
  const pagination = state.pagination.currencies

  return {
    currencies,
    userCurrencies,
    userCurrenciesIdsByCurrencyId,
    pages: pagination.pages,
    page: parseInt(ownProps.location.query.page, 10) || 1,
    hasNextPage: pagination.hasNextPage
  }
}

export default connect(mapStateToProps)(AppCurrencies)
