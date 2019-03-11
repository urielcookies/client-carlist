import React, {useEffect, useState} from 'react';
import { Tab } from 'semantic-ui-react'

// import CarInfo from './CarInfo/CarInfo' ;
import AddCarForm from '.././AddCarForm/AddCarForm';
import CarImages from './CarImages/CarImages' ;
import CarInvestment from './CarInvestment/CarInvestment' ;

import {fetchCarInfo, fetchCarImages} from '../../endpoints';

const DetailsForm = (props) => {
  const [isCarInfoLoaded, setIsCarInfoLoaded] = useState(false);
  const [isImagesLoaded, setIsImagesLoaded] = useState(false);

  const [carInfo, setCarInfo] = useState({});
  const [carImages, setCarImages] = useState([]);

  useEffect(() => {
    const carId = props.match.params.id;
    fetchCarInfo({carId, isCarInfoLoaded, setIsCarInfoLoaded, setCarInfo});
    fetchCarImages({carId, isImagesLoaded, setIsImagesLoaded, setCarImages});
  });

  if (!Object.values(carInfo).length) {
    return <div>...Loading</div>
  }
  
  const panes = [
    { menuItem: 'Info', render: () => <Tab.Pane><AddCarForm {...carInfo} /></Tab.Pane> },
    { menuItem: 'R.O.I', render: () => <Tab.Pane><CarInvestment /></Tab.Pane> },
    { menuItem: 'Images', render: () => <Tab.Pane><CarImages {...carImages} /></Tab.Pane> },
  ]

  return (
    <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
  );
};

export default DetailsForm