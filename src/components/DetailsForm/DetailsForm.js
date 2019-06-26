import React, {useEffect, useState} from 'react';
import { Tab, Header, Container, Divider } from 'semantic-ui-react'
import {Redirect} from 'react-router-dom';
// import CarInfo from './CarInfo/CarInfo' ;
import AddCarForm from '.././AddCarForm/AddCarForm';
import CarImages from './CarImages/CarImages' ;
import CarInvestment from './CarInvestment/CarInvestment' ;
import CarEstimations from './CarEstimations/CarEstimations' ;
import Status from './Status/Status';

import {fetchCarExpenses, fetchCarInfo, fetchCarImages, fetchCarStatus} from '../../endpoints';

const DetailsForm = (props) => {
  const carId = props.match.params.id;

  const [isCarInfoLoaded, setIsCarInfoLoaded] = useState(false);
  const [isExpensesLoaded, setIsExpensesLoaded] = useState(false);
  const [isImagesLoaded, setIsImagesLoaded] = useState(false);
  const [isCarStatusLoaded, setIsCarStatusLoaded] = useState(false);

  const [carInfo, setCarInfo] = useState({});
  const [expenses, setExpenses] = useState([]);
  const [carImages, setCarImages] = useState([]);
  const [carStatus, setCarStatus] = useState(null);

  useEffect(() => {
    fetchCarInfo({carId, isCarInfoLoaded, setIsCarInfoLoaded, setCarInfo});
    fetchCarExpenses({carId, isExpensesLoaded, setIsExpensesLoaded, setExpenses});
    fetchCarImages({carId, isImagesLoaded, setIsImagesLoaded, setCarImages});
    fetchCarStatus({carId, isCarStatusLoaded, setIsCarStatusLoaded, setCarStatus});
  });

  if (!Object.values(carInfo).length) {
    return <div>... Loading</div>
  }

  if (!JSON.parse(localStorage.getItem('authenticated'))) {
    return <Redirect to="/" />;
  }

  const panes = [
    { menuItem: 'Info', render: () => <Tab.Pane><AddCarForm {...carInfo} setIsCarInfoLoaded={setIsCarInfoLoaded} edit carId={carId}/></Tab.Pane> },
    { menuItem: 'R.O.I', render: () => <Tab.Pane><CarInvestment expenses={expenses} carId={carId} setIsExpensesLoaded={setIsExpensesLoaded} cost={carInfo.cost} /></Tab.Pane> },
    { menuItem: 'Data', render: () => <Tab.Pane><CarEstimations cost={carInfo.cost} expenses={expenses} /></Tab.Pane> },
    { menuItem: 'Images', render: () => <Tab.Pane><CarImages {...carImages} setIsImagesLoaded={setIsImagesLoaded} /></Tab.Pane> },
    { menuItem: 'Status', render: () => <Tab.Pane><Status {...carStatus} carId={carId} setIsCarStatusLoaded={setIsCarStatusLoaded} /></Tab.Pane> },
  ]

  return (
    <div>
      <Container textAlign="center">
        <Header as='h2'>
          {carInfo.year} {carInfo.brand} {carInfo.model}
        </Header>
      </Container>
      <Divider />
      <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
    </div>
  );
};

export default DetailsForm;
