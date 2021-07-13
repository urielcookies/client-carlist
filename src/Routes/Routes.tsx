import { FC, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import Navbar from '../components/Navbar/Navbar.js';
import AddCarForm from '../components/AddCarForm/AddCarForm';
import Carlist from '../components/Carlist/Carlist';
import DetailsForm from '../components/DetailsForm/DetailsForm';
import LoginTSX from '../components/Login/Login';
import Home from '../components/Home/Home';
import Settings from '../components/Settings/Settings';
import Trip from '../components/Trip/Trip';

import withLoginAuthentication from './withLoginAuthentication';
import withContainerUI from './withContainerUI';

import PageLoad from '../components/PageLoad/PageLoad';

import { ActiveUser, useActiveUserUpdate } from '../context/ActiveUserContext';
import { getCookie, fetchActiveUser } from '../endpoints/index';

const Routes: FC = () => {
  const setActiveUserUpdate = useActiveUserUpdate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const hasCookie = getCookie('token');

  useEffect(() => {
    const fetchUser = async () => {
      if (hasCookie) {
        setIsLoading(true);
        const response = await fetchActiveUser();
        setActiveUserUpdate(response.data as ActiveUser);
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  const AppRoutes = (
    isLoading
      ? <PageLoad />
      : (
        <Switch>
          <Route exact path="/" component={LoginTSX} />
          <Route exact path="/home" component={withLoginAuthentication(Home)} />
          <Route exact path="/home/mycarlist/addcar" component={withLoginAuthentication(AddCarForm)} />
          <Route exact path="/details/:id/:tab" component={withLoginAuthentication(DetailsForm)} />
          <Route exact path="/home/settings" component={withLoginAuthentication(Settings)} />
          <Route exact path="/home/:carlist" component={withLoginAuthentication(Carlist)} />
          <Route exact path="/home/:carlist/:userId" component={withLoginAuthentication(Carlist)} />
          <Route exact path="/home/:carlist/:userId/:carInfoId/:tab" component={withLoginAuthentication(DetailsForm)} />
          <Route exact path="/trip" component={Trip} />
        </Switch>
      )
  );

  const Divider = hasCookie && <div style={{ height: '2vh' }} />;
  const MainContent = withContainerUI(AppRoutes);
  return (
    <div>
      <Navbar />
      {Divider}
      <MainContent />
    </div>
  );
};

export default Routes;
