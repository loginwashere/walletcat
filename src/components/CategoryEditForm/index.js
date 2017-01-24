import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Form,
  FormGroup,
  Col,
  Button,
  FormControl
} from 'react-bootstrap'
import { categorySchema } from '../../../common/validation'
import { RenderField, RenderError, getValidate } from '../Common'

const validate = values => getValidate(values, categorySchema)

class CategoryEditForm extends Component {
  render() {
    const { category, error, handleSubmit, pristine, reset, submitting, invalid } = this.props
    const validationState = error => (error && 'error') || null
    return (
      <Form horizontal
            onSubmit={handleSubmit}>
        <FormGroup validationState={validationState(error)}>
          <h1 className="form-signin-heading truncate">Category {category.name}</h1>
          <FormControl.Feedback />
          <RenderError error={error} />
        </FormGroup>

        <Field autoFocus={true}
               required={true}
               name="name"
               component={RenderField}
               label="Name"
               type="text" />

        <Field name="description"
               component={RenderField}
               label="Description"
               type="text" />

        <FormGroup>
          <Col smOffset={2} sm={2} xs={3}>
            <LinkContainer to="/categories">
              <Button>
                Cancel
              </Button>
            </LinkContainer>
          </Col>
          <Col sm={2} xs={3}>
            <LinkContainer to={`/categories/${category.id}/delete`}>
              <Button>
                Delete
              </Button>
            </LinkContainer>
          </Col>
          <Col sm={2} xs={3}>
            <Button type="submit" disabled={submitting || (!error && invalid)}>
              Edit
            </Button>
          </Col>
          <Col sm={2} xs={3}>
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

CategoryEditForm.PropTypes = {
  category: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired
}

CategoryEditForm = reduxForm({
  form: 'categoryEdit',
  validate
})(CategoryEditForm);

export default CategoryEditForm;
