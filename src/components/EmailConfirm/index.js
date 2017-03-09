import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Alert } from 'react-bootstrap'
import ResendEmailConfirmForm from '../ResendEmailConfirmForm'
import { confirmEmail, resendConfirmEmail } from '../../actions'

export class EmailConfirm extends Component {
  handleResendConfirmEmail = (values) => this.props.resendConfirmEmail(values.email)

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
    const { confirmEmail, code, isEmailConfirmed } = this.props
    if (!isEmailConfirmed) {
      confirmEmail(code)
    }
  }
}

EmailConfirm.propTypes = {
  code: PropTypes.string.isRequired,
  isEmailConfirmed: PropTypes.bool.isRequired,
  isEmailConfirmResent: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  confirmEmail: PropTypes.func.isRequired,
  resendConfirmEmail: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  const user = state.auth.user || {}
  const isEmailConfirmed = user.emailConfirmed || false
  return {
    isEmailConfirmed,
    isEmailConfirmResent: state.auth.isEmailConfirmResent,
    isFetching: state.auth.isFetching,
    code: ownProps.params.code
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ confirmEmail, resendConfirmEmail }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(EmailConfirm)