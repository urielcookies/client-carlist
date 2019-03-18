import React, {useState} from 'react';
import {GoogleApiWrapper} from 'google-maps-react'

import Maps from './Maps';
import CalculateTrip from './CalculateTrip';

const GOOGLE_MAPS_API_KEY = 'AIzaSyALNBMQO5NYknt41ZSwIm-YUhacDAQ7x28';

const Trip = (props) => {
  const {google} = props;
  const [originLatLng, setOriginLatLng] = useState(null);
  const [destinationLatLng, setDestinationLatLng] = useState(null);

  const [directions, setDirections] = useState({});

  return (
    <div>
      <CalculateTrip google={google} directions={Object.keys(directions).length} setDirections={setDirections} setOriginLatLng={setOriginLatLng} setDestinationLatLng={setDestinationLatLng} />
      <br />
      <Maps directions={directions} setDirections={setDirections} google={google} originLatLng={originLatLng} destinationLatLng={destinationLatLng} />
    </div>
  )
}

export default GoogleApiWrapper({
  apiKey: GOOGLE_MAPS_API_KEY
})(Trip);
