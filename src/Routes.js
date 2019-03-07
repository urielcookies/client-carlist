import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import {Container} from 'semantic-ui-react'

import AddCarForm from './components/AddCarForm/AddCarForm';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

class Routes extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Container style={{ marginTop: '7em' }}>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/addcar' component={AddCarForm}/>
          </Switch>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default Routes;