import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { ListGroup } from 'react-bootstrap'
import { AppCurrency } from '..'
import { fetchAppAndUserCurrenciesIfNeeded } from '../../actions'

export class UserCurrencies extends Component {
  render() {
    const {
      currencies,
      userCurrencies,
      userCurrencyIds,
      dispatch
    } = this.props
    return (
      <div>
        <h1>User Currencies</h1>
        <ListGroup>
          {userCurrencyIds.map(id => {
            const userCurrency = userCurrencies[id]
            const currency = userCurrency && currencies[userCurrency.currencyId]
            return (
              currency &&
              userCurrency &&
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

UserCurrencies.propTypes = {
  currencies: PropTypes.object.isRequired,
  userCurrencies: PropTypes.object.isRequired,
  userCurrencyIds: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  const {
    isFetching,
    lastUpdated,
    items: currencies,
  }  = state.currencies || {
    isFetching: true,
    items: {}
  }

  const {
    items: userCurrencies,
    itemIds: userCurrencyIds,
  } = state.userCurrencies || {
    items: {},
    itemIds: []
  }

  return {
    isFetching,
    lastUpdated,
    currencies,
    userCurrencies,
    userCurrencyIds
  }
}

export default connect(mapStateToProps)(UserCurrencies)
