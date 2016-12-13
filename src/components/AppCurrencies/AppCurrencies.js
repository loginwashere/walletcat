import React, { Component } from 'react';
import axios, { CancelToken } from 'axios';
import { ListGroup } from 'react-bootstrap';
import AppCurrency from '../AppCurrency/AppCurrency';

class AppCurrencies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currencies: [

      ]
    };
  }

  render() {
    return (
      <div>
        <h1>App Currencies</h1>
        <ListGroup>
          {this.state.currencies.map((currency) => {
            return (
              <AppCurrency key={currency.id} currency={currency} />
            );
          })}
        </ListGroup>
      </div>
    );
  }

  componentDidMount() {
    axios
      .get('/api/currencies', {
        cancelToken: new CancelToken((c) => {
          this.serverRequestCancel = c;
        })
      })
      .then((result) => {
        this.setState({
          currencies: result.data.currencies
        });
      })
      .catch((result) => {
        console.log(111, result);
      });
  }

  componentWillUnmount() {
    this.serverRequestCancel && this.serverRequestCancel();
  }
}

export default AppCurrencies;
