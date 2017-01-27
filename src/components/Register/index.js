import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import RegisterForm from '../RegisterForm'
import { registerUser } from '../../actions'

export class Register extends Component {
  handleSubmit = (values) => {
    const { dispatch } = this.props
    return dispatch(registerUser(values))
  }

  render() {
    return (
      <RegisterForm onSubmit={this.handleSubmit} />
    )
  }
}

Register.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default connect()(Register)
