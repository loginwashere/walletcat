import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form'
import { LinkContainer } from 'react-router-bootstrap';
import {
  Form,
  FormGroup,
  Col,
  FormControl,
  Button,
  ControlLabel
} from 'react-bootstrap';

export class CategoryCreateForm extends Component {
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props
    return (
      <Form horizontal
            onSubmit={handleSubmit}>
        <FormGroup controlId="formHorizontalName">
          <Col componentClass={ControlLabel} sm={2}>
            Name
          </Col>
          <Col sm={10}>
            <Field required
                   component="input"
                   type="text"
                   className="form-control"
                   placeholder="Name"
                   name="name" />
            <FormControl.Feedback />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalDescription">
          <Col componentClass={ControlLabel} sm={2}>
            Description
          </Col>
          <Col sm={10}>
            <Field component="input"
                   type="text"
                   className="form-control"
                   placeholder="Description"
                   name="description" />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={2} xs={4}>
            <LinkContainer to="/accounts">
              <Button type="submit" disabled={submitting}>
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
            <Button type="submit"
                    disabled={pristine || submitting}
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
  form: 'categoryCreate'
})(CategoryCreateForm);

export default CategoryCreateForm;
