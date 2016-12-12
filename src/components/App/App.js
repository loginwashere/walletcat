import React, { Component } from 'react';
import Header from '../Header/Header';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class AppComponent extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="appContent">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default AppComponent;
