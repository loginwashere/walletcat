import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { AppAlert } from '..';

export class AppAlertList extends Component {
  render() {
    const { items, dispatch } = this.props;
    return (
      <div>
        {items.map((alert) => <AppAlert key={alert.id}
                                        alert={alert}
                                        dispatch={dispatch} />)}
      </div>
    );
  }
}

AppAlertList.propTypes = {
  items: PropTypes.array.isRequired
}

function mapStateToProps(state) {
  const { alerts } = state;
  const { items } = alerts || [];
  return { items };
}

export const AppAlertListConnected = connect(mapStateToProps)(AppAlertList);

export default AppAlertListConnected;
