import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import {Container} from 'semantic-ui-react'

import AddCarForm from './components/AddCarForm/AddCarForm';
import DetailsForm from './components/DetailsForm/DetailsForm';
import Login from './components/Login/Login';
import Trip from './components/Trip/Trip';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

const Routes = () =>
  <div>
    <Navbar />
    <Container style={{ marginTop: '7em' }}>
      <Switch>
        <Route exact path='/' component={Login}/>
        <Route exact path='/cars' component={Home}/>
        <Route exact path='/addcar' component={AddCarForm}/>
        <Route exact path='/trip' component={Trip}/>
        <Route exact path='/details/:id/:tab' component={DetailsForm}/>
      </Switch>
    </Container>
    <Footer />
  </div>;

export default Routes;