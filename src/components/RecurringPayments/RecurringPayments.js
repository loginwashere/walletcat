import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class RecurringPayments extends Component {
  render() {
    return (
      <h1>
        Recurring Payments
        <LinkContainer to="/recurring-payments/create">
          <Button className="pull-right">Create</Button>
        </LinkContainer>
      </h1>
    );
  }
}

export default RecurringPayments;