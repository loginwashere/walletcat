import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import axios, { CancelToken } from 'axios';

class AppCurrency extends Component {
  handleAddCurrency = () => {
    const userId = 1;

    axios
      .post(`/api/users/${userId}/currencies`, {
        currencyId: 1,
        cancelToken: new CancelToken((c) => {
          this.serverRequestCancel = c;
        })
      })
      .then((result) => {
        this.props.router.push();
      })
      .catch((result) => {
        console.log(111);
      });
  }

  render() {
    return (
      <li className="list-group-item">
        <Button className="pull-right"
                bsSize="xsmall"
                onClick={this.handleAddCurrency}>Add to My Currencies</Button>
        <h4 className="list-group-item-heading">
          {this.props.currency.name}
        </h4>
        <p className="list-group-item-text">
          {this.props.currency.description}
        </p>
      </li>
    );
  }

  componentWillUnmount() {
    this.serverRequestCancel && this.serverRequestCancel();
  }
}

AppCurrency.propTypes = {
  currency: React.PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  })
}

export default AppCurrency;
