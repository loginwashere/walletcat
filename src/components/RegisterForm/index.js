import React, { Component, PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import {
  FormGroup,
  Form,
  FormControl,
  Button
} from 'react-bootstrap'
import { registerSchema } from '../../../server/validation'
import { RenderFieldWithoutCol, RenderError, getValidate } from '../Common'

import './style.less';

const validate = values => getValidate(values, registerSchema)

export class RegisterForm extends Component {
  render() {
    const { error, handleSubmit, pristine, submitting, invalid } = this.props
    const validationState = error => (error && 'error') || null
    return (
      <Form horizontal
            onSubmit={handleSubmit}
            className="register__form">

        <FormGroup validationState={validationState(error)}>
          <h1 className="form-signin-heading">Please</h1>
          <h2 className="form-signin-heading">Create an account</h2>
          <FormControl.Feedback />
          <RenderError error={error} />
        </FormGroup>

        <Field required={true}
               autoFocus={true}
               name="email"
               type="email"
               component={RenderFieldWithoutCol}
               label="Email"/>

        <Field required={true}
               name="username"
               type="text"
               component={RenderFieldWithoutCol}
               label="Username"/>

        <Field required={true}
               name="password"
               type="password"
               component={RenderFieldWithoutCol}
               label="Password"/>

        <Button type="submit"
                disabled={pristine || submitting || invalid }
                className="btn btn-lg btn-primary btn-block">
          Create an account
        </Button>
      </Form>
    );
  }
}

RegisterForm.PropTypes = {
  handleSubmit: PropTypes.func.isRequired
}

RegisterForm = reduxForm({
  form: 'register',
  validate
})(RegisterForm)

export default RegisterForm
