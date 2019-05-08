import React, { Component } from 'react';
// import {BrowserRouter} from 'react-router-dom'
import { HashRouter } from 'react-router-dom'

import Routes from './Routes'

import 'semantic-ui-css/semantic.min.css';

class App extends Component {
  render() {
    return (
      <HashRouter>
          <Routes />
      </HashRouter>
    );
  }
}

export default App;
