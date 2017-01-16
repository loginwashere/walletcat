import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { RegisterForm } from '../RegisterForm'
import { registerUser } from '../../actions'

export class Register extends Component {
  handleSubmit = (values) => {
    const { dispatch } = this.props
    return dispatch(registerUser(values))
  }

  render() {
    return (
      <div>
        <RegisterForm onSubmit={this.handleSubmit} />
      </div>
    )
  }
}

Register.PropTypes = {
  dispatch: PropTypes.func.isRequired
}

export const RegisterConnected = connect()(Register)

export default RegisterConnected
