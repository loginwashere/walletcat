import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  Form,
  FormGroup,
  Col,
  FormControl,
  Button,
  ControlLabel
} from 'react-bootstrap';
import { registerUser } from '../../actions';

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
        <h1>Register</h1>
        <Form horizontal onSubmit={this.handleSubmit}>
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>
              Email
            </Col>
            <Col sm={10}>
              <FormControl type="email"
                           placeholder="Email"
                           onChange={this.handleEmailChange}
                           value={email} />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalUsername">
            <Col componentClass={ControlLabel} sm={2}>
              Username
            </Col>
            <Col sm={10}>
              <FormControl type="text"
                           placeholder="Username"
                           onChange={this.handleUsernameChange}
                           value={username} />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
              Password
            </Col>
            <Col sm={10}>
              <FormControl type="password"
                           placeholder="Password"
                           onChange={this.handlePasswordChange}
                           value={password} />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="submit">
                Register
              </Button>
            </Col>
          </FormGroup>
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
