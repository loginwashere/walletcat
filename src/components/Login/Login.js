import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Form,
  FormGroup,
  Col,
  FormControl,
  Checkbox,
  Button,
  ControlLabel,
  HelpBlock
} from 'react-bootstrap';
import { loginUser } from '../../actions';

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      rememberMe: false
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { dispatch } = this.props;
    const params = {
      email: this.state.email,
      password: this.state.password,
      rememberMe: this.state.rememberMe
    };

    dispatch(loginUser(params));
  }

  getValidationState = () => {
    const length = this.state.value.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
  }

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  }

  handleRememberMeChange = (e) => {
    this.setState({ rememberMe: e.target.value });
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <Form horizontal
              onSubmit={this.handleSubmit}>
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>
              Email
            </Col>
            <Col sm={10}>
              <FormControl required
                           type="email"
                           placeholder="Email"
                           onChange={this.handleEmailChange}
                           value={this.state.email} />
              <FormControl.Feedback />
              <HelpBlock>Validation is based on string length.</HelpBlock>
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
              Password
            </Col>
            <Col sm={10}>
              <FormControl required
                           type="password"
                           placeholder="Password"
                           onChange={this.handlePasswordChange}
                           value={this.state.password} />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Checkbox onChange={this.handleRememberMeChange}
                        value={this.state.rememberMe}>
                Remember me
              </Checkbox>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="submit">
                Login
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default connect()(Login);
