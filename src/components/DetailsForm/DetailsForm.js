import React, {useEffect, useState} from 'react';
import { Tab } from 'semantic-ui-react'

// import CarInfo from './CarInfo/CarInfo' ;
import AddCarForm from '.././AddCarForm/AddCarForm';
import CarImages from './CarImages/CarImages' ;
import CarInvestment from './CarInvestment/CarInvestment' ;

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
  console.log(isExpensesLoaded);
  const panes = [
    { menuItem: 'Info', render: () => <Tab.Pane><AddCarForm {...carInfo} /></Tab.Pane> },
    { menuItem: 'R.O.I', render: () => <Tab.Pane><CarInvestment expenses={expenses} cardId={carId} setIsExpensesLoaded={setIsExpensesLoaded} /></Tab.Pane> },
    { menuItem: 'Images', render: () => <Tab.Pane><CarImages {...carImages} /></Tab.Pane> },
  ]

  return (
    <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
  );
};

export default DetailsForm