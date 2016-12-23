import React, { Component } from 'react';
import {
  Image,
  Form,
  FormGroup,
  Col,
  FormControl,
  ControlLabel
} from 'react-bootstrap';
import { connect } from 'react-redux';

class Profile extends Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <h1>Profile</h1>
        <Image src={`${user.avatar}&s=250`} circle />
        <Form horizontal>
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>
              Email
            </Col>
            <Col sm={10}>
              <FormControl type="email"
                           placeholder="Email"
                           value={user.email}
                           disabled/>
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalUsername">
            <Col componentClass={ControlLabel} sm={2}>
              Username
            </Col>
            <Col sm={10}>
              <FormControl type="text"
                           placeholder="Username"
                           value={user.username}
                           disabled />
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { auth } = state;
  const { user } = auth;
  return { user };
}

export default connect(mapStateToProps)(Profile);