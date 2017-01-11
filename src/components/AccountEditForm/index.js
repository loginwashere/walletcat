import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Form,
  FormGroup,
  Col,
  Button
} from 'react-bootstrap';
import { RenderField, RenderFieldSelect } from '../Common';

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

class AccountEditForm extends Component {
  render() {
    const { handleSubmit, account, options } = this.props;
    return (
      <Form horizontal
            onSubmit={handleSubmit}>

        <Field name="name" component={RenderField} label="Name" type="text" />
        <Field name="amount" component={RenderField} label="Amount" type="number" />
        <Field name="currencyId" component={RenderFieldSelect} label="Currency" type="select" options={options} />
        <Field name="description" component={RenderField} label="Description" type="text" />

        <FormGroup>
          <Col smOffset={2} sm={2} xs={4}>
            <LinkContainer to="/accounts">
              <Button>
                Cancel
              </Button>
            </LinkContainer>
          </Col>
          <Col sm={2} xs={4}>
            <LinkContainer to={`/accounts/${account.id}/delete`}>
              <Button>
                Delete
              </Button>
            </LinkContainer>
          </Col>
          <Col sm={2} xs={4}>
            <Button type="submit">
              Edit
            </Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

AccountEditForm.PropTypes = {
  account: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired
}

AccountEditForm = reduxForm({
  form: 'accountEdit',
  validate
})(AccountEditForm);

export default AccountEditForm;
