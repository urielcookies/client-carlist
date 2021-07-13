import React from 'react';
import { BrowserRouter } from 'react-router-dom';
// import { HashRouter } from 'react-router-dom'

// import Routes from './Routes';
import { ActiveUserProvider } from './context/ActiveUserContext';
import Routes from './Routes/Routes';

import 'semantic-ui-css/semantic.min.css';

const App = () => (
  <ActiveUserProvider>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </ActiveUserProvider>
);

export default App;
