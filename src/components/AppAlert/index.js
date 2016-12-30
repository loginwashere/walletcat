import React, { Component, PropTypes } from 'react';
import { Alert } from 'react-bootstrap';
import { removeAlert } from '../../actions';

const DEFAULT_TIMEUT = 3000;

export class AppAlert extends Component {
  constructor(props) {
    super(props);

    this.timeoutId = setTimeout(
      this.handleAlertDismiss,
      this.props.alert.timeout || DEFAULT_TIMEUT
    );
  }

  handleAlertDismiss = () => {
    const { alert, dispatch } = this.props;
    dispatch(removeAlert(alert));
  }

  render() {
    const { message, description } = this.props.alert;
    return (
      <Alert bsStyle="danger"
             onDismiss={this.handleAlertDismiss}>
        <h4>{message}</h4>
        {description && <p>{description}</p>}
      </Alert>
    );
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }
}

AppAlert.propTypes = {
  alert: PropTypes.shape({
    message: PropTypes.string.isRequired,
    description: PropTypes.string,
    timeout: PropTypes.number
  }).isRequired,
  dispatch: PropTypes.func.isRequired
}

export default AppAlert;
