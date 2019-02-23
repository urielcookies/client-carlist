import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom'

import Routes from './Routes'

import 'semantic-ui-css/semantic.min.css';

class App extends Component {
  render() {
    // const formikProps = {
    //     carName: 'Sierra'
    // }
    return (
      <BrowserRouter>
          <Routes />
      </BrowserRouter>
    );
  }
}

export default App;
