import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Form,
  FormGroup,
  Col,
  Button
} from 'react-bootstrap';
import { RenderField } from '../Common';

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

export class CategoryCreateForm extends Component {
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <Form horizontal
            onSubmit={handleSubmit}>

        <Field name="name" component={RenderField} label="Name" type="text" />

        <Field name="description" component={RenderField} label="Description" type="text" />

        <FormGroup>
          <Col smOffset={2} sm={2} xs={4}>
            <LinkContainer to="/categories">
              <Button disabled={submitting}>
                Cancel
              </Button>
            </LinkContainer>
          </Col>
          <Col sm={2} xs={4}>
            <Button type="submit" disabled={submitting}>
              Create
            </Button>
          </Col>
          <Col sm={2} xs={4}>
            <Button disabled={pristine || submitting}
                    onClick={reset}>
              Clear
            </Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

CategoryCreateForm.PropTypes = {
  handleSubmit: PropTypes.func.isRequired
}

CategoryCreateForm = reduxForm({
  form: 'categoryCreate',
  validate
})(CategoryCreateForm);

export default CategoryCreateForm;