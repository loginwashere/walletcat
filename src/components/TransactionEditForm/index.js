import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Form,
  FormGroup,
  Col,
  Button
} from 'react-bootstrap';
import { RenderField, RenderFieldSelect, RenderFieldDatetime } from '../Common';

const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Required';
  } else if (values.name.length > 15) {
    errors.name = 'Must be 15 characters or less';
  }
  if (values.description && values.description.length > 15) {
    errors.description = 'Must be 15 characters or less';
  }
  return errors;
};

class TransactionEditForm extends Component {
  render() {
    const {
      handleSubmit,
      submitting,
      transaction,
      accountOptions,
      categoryOptions
    } = this.props;
    return (
      <Form horizontal
            onSubmit={handleSubmit}>

        <Field name="fromAccountId"
               component={RenderFieldSelect}
               label="From Account"
               type="select"
               options={accountOptions} />
        <Field name="toAccountId"
               component={RenderFieldSelect}
               label="To Account"
               type="select"
               options={accountOptions} />
        <Field name="fromAmount"
               component={RenderField}
               label="From Amount"
               type="number" />
        <Field name="toAmount"
               component={RenderField}
               label="To Amount"
               type="number" />
        <Field name="fromRate"
               component={RenderField}
               label="From Rate"
               type="number" />
        <Field name="toRate"
               component={RenderField}
               label="To Rate"
               type="number" />
        <Field name="date"
               component={RenderFieldDatetime}
               label="Date"
               type="text" />
        <Field name="categoryId"
               component={RenderFieldSelect}
               label="Category"
               type="select"
               options={categoryOptions} />
        <Field name="description"
               component={RenderField}
               label="Description"
               type="text" />

        <FormGroup>
          <Col smOffset={2} sm={2} xs={4}>
            <LinkContainer to="/transactions">
              <Button>
                Cancel
              </Button>
            </LinkContainer>
          </Col>
          <Col sm={2} xs={4}>
            <LinkContainer to={`/transactions/${transaction.id}/delete`}>
              <Button>
                Delete
              </Button>
            </LinkContainer>
          </Col>
          <Col sm={2} xs={4}>
            <Button type="submit" disabled={submitting}>
              Edit
            </Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

TransactionEditForm.PropTypes = {
  transaction: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired
}

TransactionEditForm = reduxForm({
  form: 'transactionEdit',
  validate
})(TransactionEditForm);

export default TransactionEditForm;
