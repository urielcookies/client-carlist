import React, {useEffect, useState} from 'react';
import {isEmpty} from 'lodash';
import { Dimmer, Loader, Tab, Header, Container, Divider } from 'semantic-ui-react';
import {/* Redirect,  */withRouter} from 'react-router-dom';
// import CarInfo from './CarInfo/CarInfo';
import Information from './Information/Information';
import CarImages from './CarImages/CarImages';
import CarExpenses from './CarExpenses/CarExpenses' ;
import CarEstimations from './CarEstimations/CarEstimations' ;
import Status from './Status/Status';

import {fetchCarExpenses, fetchCarInfo, fetchOtherCarInfo, fetchCarImages, fetchCarStatus, fetchUserPermission} from '../../endpoints';

const DetailsForm = (props) => {
  const {carInfoId} = props.match.params;

  const [activeIndexTab, setActiveIndexTab] = useState(() => 
    ['info', 'expenses', 'data', 'pics', 'status'].indexOf(props.match.params.tab)
  );

  const [isCarInfoLoading, setIsCarInfoLoading] = useState(true);
  const [isCarExpensesLoading, setIsCarExpensesLoading] = useState(true);
  const [isImagesLoaded, setIsImagesLoaded] = useState(true);
  const [isCarStatusLoading, setIsCarStatusLoading] = useState(true);
  const [isUserPermissionsLoaded, setIsUserPermissionsLoaded] = useState(true);

  const [carInfo, setCarInfo] = useState({});
  const [carExpenses, setCarExpenses] = useState([]);
  const [carImages, setCarImages] = useState([]);
  const [carStatus, setCarStatus] = useState({});
  const [userHasWritePermissions, setUserHasWritePermissions] = useState(false);
  const [up, goUp] = useState(false);

  useEffect(() => {
    if (props.match.params.carlist === 'mycarlist') {
      fetchCarInfo({carInfoId, isCarInfoLoading, setIsCarInfoLoading, setCarInfo});
    } else {
      fetchOtherCarInfo({carInfoId, isCarInfoLoading, setIsCarInfoLoading, setCarInfo});
    }
    fetchCarExpenses({carInfoId, isCarExpensesLoading, setIsCarExpensesLoading, setCarExpenses});
    fetchCarImages({carInfoId, isImagesLoaded, setIsImagesLoaded, setCarImages});
    fetchCarStatus({carInfoId, isCarStatusLoading, setIsCarStatusLoading, setCarStatus});
    fetchUserPermission({carInfoId, isUserPermissionsLoaded, setIsUserPermissionsLoaded, setUserHasWritePermissions})
  }, [isCarInfoLoading, isCarExpensesLoading, isCarStatusLoading]); // All loading that updates need to be here

  if (!up) {
    goUp(true);
    window.scrollTo(0, 0);
  }

  if (isEmpty(carInfo) || isEmpty(carStatus)) {
    return (
      <div style={{minHeight: '80vh'}}>
        <Dimmer active inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
      </div>
    );
  }

  const panes = [
    { menuItem: 'Info', render: () => <Tab.Pane><Information {...carInfo} activeUserId={props.activeUser.Id} isCarInfoLoading={isCarInfoLoading} userHasWritePermissions={userHasWritePermissions} setIsCarInfoLoading={setIsCarInfoLoading} edit carId={carInfoId}/></Tab.Pane> },
    { menuItem: 'Expenses', render: () => <Tab.Pane><CarExpenses userHasWritePermissions={userHasWritePermissions} expenses={carExpenses} carId={carInfoId} setCarExpenses={setCarExpenses} setIsCarExpensesLoading={setIsCarExpensesLoading} Cost={carInfo.Cost} isCarExpensesLoading={isCarExpensesLoading}/></Tab.Pane> },
    { menuItem: 'Data', render: () => <Tab.Pane><CarEstimations cost={carInfo.Cost} expenses={carExpenses} /></Tab.Pane> },
    // { menuItem: 'Pics', render: () => <Tab.Pane><CarImages carImages={carImages} carId={carInfoId} setIsImagesLoaded={setIsImagesLoaded} /></Tab.Pane> },
  ];

  if (!isEmpty(carImages)) {
    panes.push({
      menuItem: 'Pics', render: () => <Tab.Pane><CarImages carImages={carImages} carId={carInfoId} setIsImagesLoaded={setIsImagesLoaded} /></Tab.Pane>
    });
  }

  panes.push({
     menuItem: 'Status',
     render: () => 
      <Tab.Pane>
        <Status
          {...carStatus}
          userHasWritePermissions={userHasWritePermissions}
          carExpenses={carExpenses}
          carCost={carInfo.Cost}
          CarInformationId={carInfoId}
          setIsCarStatusLoading={setIsCarStatusLoading} />
      </Tab.Pane>
  })

  const tabs = ['info', 'expenses', 'data', 'pics', 'status'];
  let indexTab = tabs.indexOf(props.match.params.tab);
  indexTab = props.match.params.tab ? indexTab : 0;
  const tabOnChange = (e, d) => {
    if (activeIndexTab !== d.activeIndex) {
      // props.history.push(tabs[d.activeIndex]);
      const path = props.history.location.pathname
        .substring(0, props.history.location.pathname.lastIndexOf('/'));
      setActiveIndexTab(d.activeIndex);
      window.history.pushState({}, null, `${path}/${tabs[d.activeIndex]}`);
    }
  };

  return (
    <div style={{minHeight: '80vh'}}>
      <Container textAlign="center">
        <Header as='h2'>
          {carInfo.Year} {carInfo.Brand} {carInfo.Model}
        </Header>
      </Container>
      <Divider />
      <Tab id="tabs" onTabChange={tabOnChange} activeIndex={activeIndexTab} panes={panes} />
    </div>
  );
};

export default withRouter(DetailsForm);
