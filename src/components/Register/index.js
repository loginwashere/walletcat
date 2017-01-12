import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  Form,
  FormControl,
  Button,
  ControlLabel
} from 'react-bootstrap';
import { registerUser } from '../../actions';

import './style.less';

export class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      username: '',
      password: ''
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { dispatch } = this.props;
    const params = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password
    };

    dispatch(registerUser(params));
  }

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  }

  handleUsernameChange = (e) => {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  }

  render() {
    const { email, username, password } = this.state;
    return (
      <div>
        <Form horizontal
              onSubmit={this.handleSubmit}
              className="register__form">
          <h1 className="form-signin-heading">Please</h1>
          <h2 className="form-signin-heading">Create an account</h2>
          <ControlLabel className="sr-only">
            Email
          </ControlLabel>
          <FormControl required
                       autoFocus
                       type="email"
                       placeholder="Email"
                       onChange={this.handleEmailChange}
                       value={email} />

          <ControlLabel className="sr-only">
            Username
          </ControlLabel>
          <FormControl required
                       type="text"
                       placeholder="Username"
                       onChange={this.handleUsernameChange}
                       value={username} />
          <ControlLabel className="sr-only">
            Password
          </ControlLabel>
          <FormControl required
                       type="password"
                       placeholder="Password"
                       onChange={this.handlePasswordChange}
                       value={password} />
          <Button type="submit" className="btn btn-lg btn-primary btn-block">
            Create an account
          </Button>
        </Form>
      </div>
    );
  }
}

Register.PropTypes = {
  dispatch: PropTypes.func.isRequired
}

export const RegisterConnected = connect()(Register);

export default RegisterConnected;
