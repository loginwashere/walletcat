import React, { Component, PropTypes } from 'react'
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
      <LoginForm onSubmit={this.handleSubmit} />
    )
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default connect()(Login)
