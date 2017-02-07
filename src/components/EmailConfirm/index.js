import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  Alert
} from 'react-bootstrap'
import ResendEmailConfirmForm from '../ResendEmailConfirmForm'
import { confirmEmail, resendConfirmEmail } from '../../actions'

export class EmailConfirm extends Component {
  handleResendConfirmEmail = (values) => {
    const { dispatch } = this.props
    return dispatch(resendConfirmEmail(values.email))
  }

  render() {
    const { isEmailConfirmed, isEmailConfirmResent, isFetching } = this.props
    return (
      <div>
        <h1>Email confirm</h1>
        {isFetching && <p>Loading</p>}
        {isEmailConfirmed && !isFetching && <Alert bsStyle="success">
          <strong>Success!</strong> You've' successfuly confirmed your email
        </Alert>}
        {isEmailConfirmResent && !isFetching && <Alert bsStyle="info">
          <strong>Success!</strong> We've sent you confirmation email, please click the link in this email.
        </Alert>}
        { !isEmailConfirmed &&
          !isEmailConfirmResent &&
          !isFetching &&
          <div>
            <Alert bsStyle="danger">
              <p><strong>That's weird!</strong> Something went wrong</p>
            </Alert>
            <ResendEmailConfirmForm onSubmit={this.handleResendConfirmEmail}/>
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    const { dispatch, code, isEmailConfirmed } = this.props
    if (!isEmailConfirmed) {
      dispatch(confirmEmail(code))
    }
  }
}

EmailConfirm.propTypes = {
  code: PropTypes.string.isRequired,
  isEmailConfirmed: PropTypes.bool.isRequired,
  isEmailConfirmResent: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state, ownProps) {
  const user = state.auth.user || {}
  const isEmailConfirmed = user.emailConfirmed || false
  const isEmailConfirmResent = state.auth.isEmailConfirmResent
  const isFetching = state.auth.isFetching || true
  const code = ownProps.params.code
  return {
    isEmailConfirmed,
    isEmailConfirmResent,
    isFetching,
    code
  }
}

export default connect(mapStateToProps)(EmailConfirm)