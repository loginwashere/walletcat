import React, { PropTypes } from 'react'
import { ListGroup } from 'react-bootstrap'
import AppCurrency from '../AppCurrency'

const UserCurrenciesPage = ({ userCurrencyIds, currencies, userCurrencies, dispatch }) => (
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
)

UserCurrenciesPage.propTypes = {
  userCurrencyIds: PropTypes.array.isRequired,
  currencies: PropTypes.object.isRequired,
  userCurrencies: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default UserCurrenciesPage
