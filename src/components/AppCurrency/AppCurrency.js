import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import { addUserCurrency, removeUserCurrency } from '../../actions';

class AppCurrency extends Component {
  handleAddUserCurrency = () => {
    const { dispatch, currency } = this.props;
    dispatch(addUserCurrency(currency));
  }

  handleRemoveUserCurrency = () => {
    const { dispatch, userCurrency } = this.props;
    dispatch(removeUserCurrency(userCurrency));
  }

  render() {
    const { currency, userCurrency } = this.props;
    return (
      <li className="list-group-item">
        {
          userCurrency
            ? <Button className="pull-right"
                  bsSize="xsmall"
                  onClick={this.handleRemoveUserCurrency}>Remove from My Currencies</Button>
            : <Button className="pull-right"
                  bsSize="xsmall"
                  onClick={this.handleAddUserCurrency}>Add to My Currencies</Button>
        }
        <h4 className="list-group-item-heading">
          {currency.name}
        </h4>
        <p className="list-group-item-text">
          {currency.description}
        </p>
      </li>
    );
  }
}

AppCurrency.propTypes = {
  currency: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }),
  userCurrency: PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    currencyId: PropTypes.number.isRequired
  }),
  dispatch: PropTypes.func.isRequired
}

export default AppCurrency;
