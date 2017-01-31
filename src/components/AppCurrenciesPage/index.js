import React, { PropTypes } from 'react'
import { ListGroup } from 'react-bootstrap'
import AppCurrency from '../AppCurrency'

const AppCurrenciesPage = ({
  currencyIds,
  currencies,
  userCurrencies,
  userCurrenciesIdsByCurrencyId,
  dispatch
}) => (
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
)

AppCurrenciesPage.propTypes = {
  currencyIds: PropTypes.array.isRequired,
  currencies: PropTypes.object.isRequired,
  userCurrenciesIdsByCurrencyId: PropTypes.object.isRequired,
  userCurrencies: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default AppCurrenciesPage
