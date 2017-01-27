import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { ListGroup } from 'react-bootstrap'
import { AppCurrency } from '..'
import { fetchAppAndUserCurrenciesIfNeeded } from '../../actions'

export class AppCurrencies extends Component {
  render() {
    const {
      currencies,
      currencyIds,
      userCurrencies,
      userCurrenciesIdsByCurrencyId,
      dispatch
    } = this.props
    return (
      <div>
        <h1>App Currencies</h1>
        <ListGroup>
          {currencyIds.map(id => {
            const currency = currencies[id]
            const userCurrencyId = userCurrenciesIdsByCurrencyId[id]
            const userCurrency = userCurrencyId && userCurrencies[userCurrencyId]
            return (
              currency &&
              <AppCurrency key={currency.id}
                           currency={currency}
                           userCurrency={userCurrency}
                           dispatch={dispatch} />
            )
          })}
        </ListGroup>
      </div>
    )
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchAppAndUserCurrenciesIfNeeded())
  }
}

AppCurrencies.propTypes = {
  currencies: PropTypes.object.isRequired,
  currencyIds: PropTypes.array.isRequired,
  userCurrencies: PropTypes.object.isRequired,
  userCurrenciesIdsByCurrencyId: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const {
    isFetching,
    lastUpdated,
    items: currencies,
    itemIds: currencyIds
  }  = state.currencies || {
    isFetching: true,
    items: {},
    itemIds: []
  }

  const {
    items: userCurrencies,
    itemsByCurrencyId: userCurrenciesIdsByCurrencyId
  } = state.userCurrencies || {
    items: {},
    itemsByCurrencyId: {}
  }

  return {
    isFetching,
    lastUpdated,
    currencies,
    currencyIds,
    userCurrencies,
    userCurrenciesIdsByCurrencyId
  }
}

export default connect(mapStateToProps)(AppCurrencies)
