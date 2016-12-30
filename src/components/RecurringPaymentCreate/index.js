import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Form,
  FormGroup,
  Col,
  FormControl,
  Button,
  ControlLabel
} from 'react-bootstrap';
import { createCategory } from '../../actions';

export class RecurringPaymentCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: ''
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { dispatch } = this.props;
    const params = {
      name: this.state.name,
      description: this.state.description
    };

    dispatch(createCategory(params));
  }

  getValidationState = () => {
    const length = this.state.value.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
  }

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  }

  handleDescriptionChange = (e) => {
    this.setState({ description: e.target.value });
  }

  render() {
    return (
      <div>
        <h1>New Recurring Payment</h1>
        <Form horizontal
              onSubmit={this.handleSubmit}>
          <FormGroup controlId="formHorizontalName">
            <Col componentClass={ControlLabel} sm={2}>
              Name
            </Col>
            <Col sm={10}>
              <FormControl required
                           type="text"
                           placeholder="Name"
                           onChange={this.handleNameChange}
                           value={this.state.name} />
              <FormControl.Feedback />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalDescription">
            <Col componentClass={ControlLabel} sm={2}>
              Description
            </Col>
            <Col sm={10}>
              <FormControl type="text"
                           placeholder="Description"
                           onChange={this.handleDescriptionChange}
                           value={this.state.description} />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={2} xs={6}>
              <LinkContainer to="/recurring-payments">
                <Button type="submit">
                  Cancel
                </Button>
              </LinkContainer>
            </Col>
            <Col sm={2} xs={6}>
              <Button type="submit">
                Create
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

RecurringPaymentCreate.PropTypes = {
  dispatch: PropTypes.func.isRequired
}

export const RecurringPaymentCreateConnected = connect()(RecurringPaymentCreate);

export default RecurringPaymentCreateConnected;
