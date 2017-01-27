import React, { Component, PropTypes } from 'react'
import {
  Image,
  Form,
  FormGroup,
  Col,
  FormControl,
  ControlLabel
} from 'react-bootstrap'
import { connect } from 'react-redux'

export class Profile extends Component {
  render() {
    const { user } = this.props
    return (
      <div>
        <h1>Profile</h1>
        <Form horizontal>

          <FormGroup controlId="formHorizontalAvatar">
            <Image src={`${user.avatar}&s=250`} circle />
          </FormGroup>

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
    )
  }
}

Profile.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired
  }).isRequired
}

function mapStateToProps(state) {
  const { auth } = state
  const { user } = auth
  return { user }
}

export default connect(mapStateToProps)(Profile)