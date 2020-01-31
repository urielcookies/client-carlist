import React, {useEffect, useState} from 'react';
import {isEmpty} from 'lodash';
import { Dimmer, Loader, Tab, Header, Container, Divider } from 'semantic-ui-react';
import {/* Redirect,  */withRouter} from 'react-router-dom';
// import CarInfo from './CarInfo/CarInfo';
import AddCarForm from '.././AddCarForm/AddCarForm';
// import CarImages from './CarImages/CarImages';
import CarExpenses from './CarExpenses/CarExpenses' ;
// import CarEstimations from './CarEstimations/CarEstimations' ;
// import Status from './Status/Status';

import {fetchCarExpenses, fetchCarInfo, fetchOtherCarInfo/* , fetchCarImages, fetchCarStatus */} from '../../endpoints';

const DetailsForm = (props) => {
  // console.log(props);
  const {carInfoId} = props.match.params;

  const [isCarInfoLoading, setIsCarInfoLoading] = useState(true);
  const [isCarExpensesLoading, setIsCarExpensesLoading] = useState(true);
  // const [isImagesLoaded, setIsImagesLoaded] = useState(false);
  // const [isCarStatusLoaded, setIsCarStatusLoaded] = useState(false);

  const [carInfo, setCarInfo] = useState({});
  const [carExpenses, setCarExpenses] = useState([]);
  // const [carImages, setCarImages] = useState([]);
  // const [carStatus, setCarStatus] = useState(null);
  const [up, goUp] = useState(false);

  useEffect(() => {
    if (props.match.params.carlist === 'mycarlist') {
      fetchCarInfo({carInfoId, isCarInfoLoading, setIsCarInfoLoading, setCarInfo});
    } else {
      fetchOtherCarInfo({carInfoId, isCarInfoLoading, setIsCarInfoLoading, setCarInfo});
    }
    fetchCarExpenses({carInfoId, isCarExpensesLoading, setIsCarExpensesLoading, setCarExpenses});
    // fetchCarImages({carId, isImagesLoaded, setIsImagesLoaded, setCarImages});
    // fetchCarStatus({carId, isCarStatusLoaded, setIsCarStatusLoaded, setCarStatus});
  }, []);

  if (!up) {
    goUp(true);
    window.scrollTo(0, 0);
  }

  // if (!Object.values(carInfo).length) {
  //   return <div>... Loading</div>
  // }

  // if (!carStatus) {
  //   return <div>... Loading</div>
  // }

  // if (!JSON.parse(localStorage.getItem('authenticated'))) {
  //   return <Redirect to="/" />;
  // }

  if (isCarInfoLoading || isCarExpensesLoading) {
    return (
      <Dimmer active inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>
    );
  }
  
  const panes = [
    { menuItem: 'Info', render: () => <Tab.Pane><AddCarForm {...carInfo} setIsCarInfoLoading={setIsCarInfoLoading} edit carId={carInfoId}/></Tab.Pane> },
    { menuItem: 'Expenses', render: () => <Tab.Pane><CarExpenses expenses={carExpenses} carId={carInfoId} setIsExpensesLoaded={setIsCarExpensesLoading} Cost={carInfo.Cost} /></Tab.Pane> },
    // { menuItem: 'Data', render: () => <Tab.Pane><CarEstimations cost={carInfo.cost} expenses={expenses} /></Tab.Pane> },
    // { menuItem: 'Pics', render: () => <Tab.Pane loading><CarImages {...carImages} carId={carId} setIsImagesLoaded={setIsImagesLoaded} /></Tab.Pane> },
    // { menuItem: 'Status', render: () => <Tab.Pane><Status {...carStatus} carId={carId} setIsCarStatusLoaded={setIsCarStatusLoaded} /></Tab.Pane> },
  ];

  const tabs = ['info', 'expenses', 'data', 'pics', 'status'];
  let indexTab = tabs.indexOf(props.match.params.tab);
  indexTab = props.match.params.tab ? indexTab : 0;
  const tabOnChange = (e, d) => {
    props.history.push(tabs[d.activeIndex]);
  };

  // console.log('carInfo', carInfo);

  return (
    <div style={{minHeight: '80vh'}}>
      <Container textAlign="center">
        <Header as='h2'>
          {carInfo.Year} {carInfo.Brand} {carInfo.Model}
        </Header>
      </Container>
      <Divider />
      <Tab onTabChange={tabOnChange} activeIndex={indexTab} panes={panes} />
    </div>
  );
};

export default withRouter(DetailsForm);
