import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import { oauthSignIn } from '../../actions'

export class OAuthSignInButton extends Component {
  handleClick = () => {
    const { dispatch, provider } = this.props
    dispatch(oauthSignIn(provider))
  }

  render() {
    const { className, title } = this.props
    return (
      <Button className={className} onClick={this.handleClick}>{title}</Button>
    )
  }
}

OAuthSignInButton.propTypes = {
  provider: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.string
}

export default connect()(OAuthSignInButton)
