import React, { Component,PropTypes } from 'react'
import { connect } from 'react-redux'
import LoginForm from '../LoginForm'
import { loginUser } from '../../actions'

export class Login extends Component {
  handleSubmit = values => {
    const { dispatch } = this.props
    return dispatch(loginUser(values))
  }

  render() {
    return (
      <div>
        <LoginForm onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

Login.PropTypes = {
  dispatch: PropTypes.func.isRequired
}

export const LoginConnected = connect()(Login);

export default LoginConnected;
