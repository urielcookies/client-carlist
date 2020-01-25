import React from 'react';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
import {Container} from 'semantic-ui-react'

import Breadcrumb from './components/Breadcrumb/Breadcrumb';

import AddCarForm from './components/AddCarForm/AddCarForm';
import Carlist from './components/Carlist/Carlist';
import DetailsForm from './components/DetailsForm/DetailsForm';
import Login from './components/Login/Login';
import Trip from './components/Trip/Trip';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

const Routes = (props) => {
  const getCookie = (name) => {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  if (!getCookie('token') && props.location.pathname !== '/login') 
    return <Redirect to="/login" />;

  const My404Component = () => (
    <div style={{height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <h1>404 Page Not Found</h1>
    </div>
  );
  
  const Exp = (props) => 
  {
    // console.log('exp', props);
  return <div style={{height: '80vh'}}>Exp</div>
  }
  return (
    <div>
      {getCookie('token') && <Navbar />}
      {getCookie('token') && <Breadcrumb {...props}/>}
      <Container>
        <Switch>
          <Route exact path='/home' component={Home}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/addcar' component={AddCarForm}/>
          <Route exact path='/trip' component={Trip}/>
          <Route exact path='/details/:id/:tab' component={DetailsForm}/>
          <Route exact path='/home/carlist' component={Carlist}/>
          <Route exact path='/home/carlist/:userId' component={Carlist}/>
          <Route exact path='/home/carlist/:userId/:carInfoId/:tab' component={Exp}/>
          {/* <Route exact path='/exp/:id' component={exp}/> */}
          <Route path='/404' component={My404Component} />
          <Redirect from='*' to='/404' />
        </Switch>
      </Container>
      <Footer />
    </div>
  );
};

export default withRouter(Routes);
