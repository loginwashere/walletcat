import React, { Component, PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import {
  Form,
  FormGroup,
  FormControl,
  Button,
  ControlLabel,
  HelpBlock
} from 'react-bootstrap'
import Joi from 'joi'
import { loginSchema } from '../../../server/validation'
import errorMessages from '../../../server/utils/errorMessages'

import './style.less'

const validate = values => errorMessages(Joi.validate(values, loginSchema))

const RenderError = ({error}) => (
  <div>
    {error && (Array.isArray(error) ? error : [error])
      .map((i, index) => <HelpBlock key={index}>{i}</HelpBlock>)}
  </div>
)

const renderField = ({
  input, label, type, meta: { touched, error, warning, valid }, required, autoFocus
}) => {
  const validationState = (touched, error, warning) => (touched && (
      (error && 'error') ||
      (warning && 'warning') ||
      (!warning && valid && 'success'))) ||
    null
  return (
    <FormGroup validationState={validationState(touched, error, warning)}>
      <ControlLabel className="sr-only">{label}</ControlLabel>
      <FormControl {...input}
                  required={required}
                  autoFocus={autoFocus}
                  type={type}
                  placeholder={label} />
      <FormControl.Feedback />
      {touched && (
        (error && <RenderError error={error} />) ||
        (warning && <RenderError error={warning} />))}
    </FormGroup>
  )
}

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
          {(error && <HelpBlock>{error}</HelpBlock>)}
        </FormGroup>

        <Field required={true}
               autoFocus={true}
               name="login"
               type="text"
               component={renderField}
               label="Username or Email"/>

        <Field required={true}
               name="password"
               type="password"
               component={renderField}
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
