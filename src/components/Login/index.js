import React, { Component,PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  Form,
  FormGroup,
  Col,
  FormControl,
  Button,
  ControlLabel
} from 'react-bootstrap';
import { loginUser } from '../../actions';

import './style.less';

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { dispatch } = this.props;
    const params = {
      email: this.state.email,
      password: this.state.password
    };

    dispatch(loginUser(params));
  }

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  }

  render() {
    return (
      <div>
        <Form horizontal
              onSubmit={this.handleSubmit}
              className="login__form">

          <h1 className="form-signin-heading">Please sign in</h1>
          <ControlLabel className="sr-only">
            Email
          </ControlLabel>
          <FormControl required
                       autoFocus
                       type="email"
                       placeholder="Email"
                       onChange={this.handleEmailChange}
                       value={this.state.email} />
          <FormControl.Feedback />

          <ControlLabel className="sr-only">
            Password
          </ControlLabel>
          <FormControl required
                       type="password"
                       placeholder="Password"
                       onChange={this.handlePasswordChange}
                       value={this.state.password} />

          <Button type="submit" className="btn btn-lg btn-primary btn-block">
            Sign in
          </Button>
        </Form>
      </div>
    );
  }
}

Login.PropTypes = {
  dispatch: PropTypes.func.isRequired
}

export const LoginConnected = connect()(Login);

export default LoginConnected;
