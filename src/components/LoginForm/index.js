import React, { Component, PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import {
  Form,
  Button
} from 'react-bootstrap'
import { loginSchema } from '../../../common/validation'
import { RenderFieldWithoutCol, WalletFormHeader, getValidate } from '../Common'
import OAuthSignInButton from '../OAuthSignInButton'

import './style.less'

const validate = values => getValidate(values, loginSchema)

export class LoginForm extends Component {
  render() {
    const { error, handleSubmit, pristine, submitting, invalid } = this.props
    return (
      <Form horizontal
            onSubmit={handleSubmit}
            className="login__form">
        <WalletFormHeader error={error}>Please sign in</WalletFormHeader>

        <Field required={true}
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
                disabled={pristine || submitting || (!error && invalid) }
                className="btn btn-lg btn-primary btn-block">
          Sign in
        </Button>
        <OAuthSignInButton provider="facebook"
                           title="Sign In using Facebook"
                           className="btn btn-lg btn-block" />
      </Form>
    )
  }
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired
}

export default reduxForm({
  form: 'login',
  validate
})(LoginForm)
