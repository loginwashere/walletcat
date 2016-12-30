import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ListGroup } from 'react-bootstrap';
import { AppCurrency } from '..';
import { fetchAppAndUserCurrenciesIfNeeded } from '../../actions';

export class UserCurrencies extends Component {
  render() {
    const { currencies, userCurrencies, dispatch } = this.props;
    return (
      <div>
        <h1>User Currencies</h1>
        <ListGroup>
          {currencies.map((currency) => {
            const userCurrency = userCurrencies
              .filter(userCurrency => userCurrency.currencyId === currency.id)[0];
            return (
              currency && userCurrency && <AppCurrency key={currency.id}
                           currency={currency}
                           userCurrency={userCurrency}
                           dispatch={dispatch} />
            );
          })}
        </ListGroup>
      </div>
    );
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAppAndUserCurrenciesIfNeeded());
  }
}

UserCurrencies.propTypes = {
  currencies: PropTypes.array.isRequired,
  userCurrencies: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const {
    isFetching,
    lastUpdated,
    items: currencies
  }  = state.currencies || {
    isFetching: true,
    items: []
  }

  const { items: userCurrencies } = state.userCurrencies || { items: [] };

  return {
    isFetching,
    lastUpdated,
    currencies,
    userCurrencies
  };
}

const UserCurrenciesConnected = connect(mapStateToProps)(UserCurrencies);

export default UserCurrenciesConnected;
