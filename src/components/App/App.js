import React, { Component } from 'react';
import Header from '../Header/Header';
import AppAlertList from '../AppAlertList/AppAlertList';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

export default class AppComponent extends Component {
  handleAlertDismiss() {
    this.setState({alertVisible: false});
  }

  render() {
    return (
      <div>
        <Header />
        <div className="appContent container">
          <AppAlertList />
          {this.props.children}
        </div>
      </div>
    );
  }
}
