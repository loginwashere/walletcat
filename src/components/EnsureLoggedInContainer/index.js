import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { setRedirectUrl } from '../../actions'

class EnsureLoggedInContainer extends Component {
  componentDidMount() {
    const { dispatch, currentUrl, isAuthenticated } = this.props

    if (!isAuthenticated) {
      dispatch(setRedirectUrl(currentUrl))
      dispatch(push('/sign-in'))
    }
  }

  render() {
    if (this.props.isAuthenticated) {
      return this.props.children
    } else {
      return null
    }
  }
}

EnsureLoggedInContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  isAuthenticated: PropTypes.bool.isRequired,
  currentUrl: PropTypes.string
}

function mapStateToProps(state, ownProps) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    currentUrl: ownProps.location.pathname
  }
}

export default connect(mapStateToProps)(EnsureLoggedInContainer)