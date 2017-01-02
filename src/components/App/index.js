import React, { Component } from 'react';
import { HeaderConnected, AppAlertListConnected } from '..';

import './style.less';

export class App extends Component {
  render() {
    return (
      <div>
        <HeaderConnected />
        <div className="appContent container">
          <AppAlertListConnected />
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
