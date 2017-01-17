import React, { Component, PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import {
  Form,
  FormGroup,
  FormControl,
  Button
} from 'react-bootstrap'
import { loginSchema } from '../../../server/validation'
import { RenderFieldWithoutCol, RenderError, getValidate } from '../Common'

import './style.less'

const validate = values => getValidate(values, loginSchema)

export class LoginForm extends Component {
  render() {
    const { error, handleSubmit, pristine, submitting, invalid } = this.props
    const validationState = error => (error && 'error') || null
    return (
      <Form horizontal
            onSubmit={handleSubmit}
            className="login__form">

        <FormGroup validationState={validationState(error)}>
          <h1 className="form-signin-heading">Please sign in</h1>
          <FormControl.Feedback />
          <RenderError error={error} />
        </FormGroup>

        <Field required={true}
               autoFocus={true}
               name="login"
               type="text"
               component={RenderFieldWithoutCol}
               label="Username or Email"/>

        <Field required={true}
               name="password"
               type="password"
               component={RenderFieldWithoutCol}
               label="Password"/>
        <Button type="submit"
                disabled={pristine || submitting || invalid }
                className="btn btn-lg btn-primary btn-block">
          Sign in
        </Button>
      </Form>
    )
  }
}

LoginForm.PropTypes = {
  handleSubmit: PropTypes.func.isRequired
}

LoginForm = reduxForm({
  form: 'login',
  validate
})(LoginForm)

export default LoginForm
