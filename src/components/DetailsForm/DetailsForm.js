import React, {useEffect, useState} from 'react';
import {isEmpty} from 'lodash';
import { Dimmer, Loader, Tab, Header, Container, Divider } from 'semantic-ui-react';
import {/* Redirect,  */withRouter} from 'react-router-dom';
// import CarInfo from './CarInfo/CarInfo';
import AddCarForm from '.././AddCarForm/AddCarForm';
import CarImages from './CarImages/CarImages';
import CarExpenses from './CarExpenses/CarExpenses' ;
import CarEstimations from './CarEstimations/CarEstimations' ;
// import Status from './Status/Status';

import {fetchCarExpenses, fetchCarInfo, fetchOtherCarInfo, fetchCarImages/*, fetchCarStatus */} from '../../endpoints';

const DetailsForm = (props) => {
  // console.log(props);
  const {carInfoId} = props.match.params;

  const [isCarInfoLoading, setIsCarInfoLoading] = useState(true);
  const [isCarExpensesLoading, setIsCarExpensesLoading] = useState(true);
  const [activeIndexTab, setActiveIndexTab] = useState(() => 
    ['info', 'expenses', 'data', 'pics', 'status'].indexOf(props.match.params.tab)
  );
  const [isImagesLoaded, setIsImagesLoaded] = useState(true);
  // const [isCarStatusLoaded, setIsCarStatusLoaded] = useState(false);

  const [carInfo, setCarInfo] = useState({});
  const [carExpenses, setCarExpenses] = useState([]);
  const [carImages, setCarImages] = useState([]);
  // const [carStatus, setCarStatus] = useState(null);
  const [up, goUp] = useState(false);

  useEffect(() => {
    if (props.match.params.carlist === 'mycarlist') {
      fetchCarInfo({carInfoId, isCarInfoLoading, setIsCarInfoLoading, setCarInfo});
    } else {
      fetchOtherCarInfo({carInfoId, isCarInfoLoading, setIsCarInfoLoading, setCarInfo});
    }
    fetchCarExpenses({carInfoId, isCarExpensesLoading, setIsCarExpensesLoading, setCarExpenses});
    fetchCarImages({carInfoId, isImagesLoaded, setIsImagesLoaded, setCarImages});
    // fetchCarStatus({carId, isCarStatusLoaded, setIsCarStatusLoaded, setCarStatus});
  }, [isCarInfoLoading, isCarExpensesLoading]);

  if (!up) {
    goUp(true);
    window.scrollTo(0, 0);
  }

  if (isEmpty(carInfo)) {
    return (
      <div style={{height: '80vh'}}>
        <Dimmer active inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
      </div>
    );
  }

  const panes = [
    { menuItem: 'Info', render: () => <Tab.Pane><AddCarForm {...carInfo} setIsCarInfoLoading={setIsCarInfoLoading} edit carId={carInfoId}/></Tab.Pane> },
    { menuItem: 'Expenses', render: () => <Tab.Pane><CarExpenses expenses={carExpenses} carId={carInfoId} setCarExpenses={setCarExpenses} setIsCarExpensesLoading={setIsCarExpensesLoading} Cost={carInfo.Cost} isCarExpensesLoading={isCarExpensesLoading}/></Tab.Pane> },
    { menuItem: 'Data', render: () => <Tab.Pane><CarEstimations cost={carInfo.Cost} expenses={carExpenses} /></Tab.Pane> },
    // { menuItem: 'Pics', render: () => <Tab.Pane><CarImages carImages={carImages} carId={carInfoId} setIsImagesLoaded={setIsImagesLoaded} /></Tab.Pane> },
    // { menuItem: 'Status', render: () => <Tab.Pane><Status {...carStatus} carId={carId} setIsCarStatusLoaded={setIsCarStatusLoaded} /></Tab.Pane> },
  ];

  if (!isEmpty(carImages)) {
    panes.push({
      menuItem: 'Pics', render: () => <Tab.Pane><CarImages carImages={carImages} carId={carInfoId} setIsImagesLoaded={setIsImagesLoaded} /></Tab.Pane>
    })
  }

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
      <Tab onTabChange={tabOnChange} activeIndex={activeIndexTab} panes={panes} />
    </div>
  );
};

export default withRouter(DetailsForm);
