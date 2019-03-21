import React, {useEffect, useState} from 'react';
import { Tab, Header, Container, Divider } from 'semantic-ui-react'

// import CarInfo from './CarInfo/CarInfo' ;
import AddCarForm from '.././AddCarForm/AddCarForm';
import CarImages from './CarImages/CarImages' ;
import CarInvestment from './CarInvestment/CarInvestment' ;
import CarEstimations from './CarEstimations/CarEstimations' ;

import {fetchCarExpenses, fetchCarInfo, fetchCarImages} from '../../endpoints';

const DetailsForm = (props) => {
  const carId = props.match.params.id;

  const [isCarInfoLoaded, setIsCarInfoLoaded] = useState(false);
  const [isExpensesLoaded, setIsExpensesLoaded] = useState(false);
  const [isImagesLoaded, setIsImagesLoaded] = useState(false);

  const [carInfo, setCarInfo] = useState({});
  const [expenses, setExpenses] = useState([]);
  const [carImages, setCarImages] = useState([]);

  useEffect(() => {
    fetchCarInfo({carId, isCarInfoLoaded, setIsCarInfoLoaded, setCarInfo});
    fetchCarExpenses({carId, isExpensesLoaded, setIsExpensesLoaded, setExpenses});
    fetchCarImages({carId, isImagesLoaded, setIsImagesLoaded, setCarImages});
  });

  if (!Object.values(carInfo).length) {
    return <div>... Loading</div>
  }

  const panes = [
    { menuItem: 'Info', render: () => <Tab.Pane><AddCarForm {...carInfo} setIsCarInfoLoaded={setIsCarInfoLoaded} edit carId={carId}/></Tab.Pane> },
    { menuItem: 'R.O.I', render: () => <Tab.Pane><CarInvestment expenses={expenses} carId={carId} setIsExpensesLoaded={setIsExpensesLoaded} cost={carInfo.cost} /></Tab.Pane> },
    { menuItem: 'Data', render: () => <Tab.Pane><CarEstimations cost={carInfo.cost} expenses={expenses} /></Tab.Pane> },
    { menuItem: 'Images', render: () => <Tab.Pane><CarImages {...carImages} /></Tab.Pane> },
    { menuItem: 'Status', render: () => <Tab.Pane><div>Sold. Price. ROU Data</div></Tab.Pane> },
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
