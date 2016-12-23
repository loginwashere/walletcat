import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import AppAlert from '../AppAlert/AppAlert';

export class AppAlertList extends Component {
  render() {
    const { items, dispatch } = this.props;
    return (
      <div>
        {items && items.map((alert) => <AppAlert key={alert.id}
                                                 alert={alert}
                                                 dispatch={dispatch} />)}
      </div>
    );
  }
}

AppAlertList.propTypes = {
  alerts: PropTypes.array
}

function mapStateToProps(state) {
  const { alerts } = state;
  const { items } = alerts;
  return { items };
}

export default connect(mapStateToProps)(AppAlertList);
