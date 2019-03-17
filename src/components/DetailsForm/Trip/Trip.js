import React, {useState} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'
import { Table, Input, Divider, Icon, Header} from 'semantic-ui-react'

const GOOGLE_MAPS_API_KEY = 'AIzaSyCd_KjCpZJ2F2vBc67F_bsXdHEWZCv6tyk';

const Trip = (props) => {
  // add input listeners
  const {
    posts,
    latitude,
    longitude,
    google
  } = props;

  const origins = ['Albuquerque, NM, USA'];
  const destinations = ['Los Angeles, CA, USA'];
  const travelMode = 'DRIVING';

  var service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
    {
        origins: origins,
        destinations: destinations,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL, // miles and feet.
        // unitSystem: google.maps.UnitSystem.metric, // kilometers and meters.
        avoidHighways: false,
        avoidTolls: false
    }, (success => console.log(success)));

  return (
    <div>
      {/* <Map 
        google={google}
        initialCenter={{
          lat: Number(34.05349),
          lng: Number(-118.24532)
        }}
        onClick={() => console.log('Clicked')}
        zoom={10} /> */}
      <form id="distance_form">
        <div className="form-group">
            <label>Origin: </label> 
            <input className="form-control" id="from_places" placeholder="Enter a location" required /> 
            <input id="origin" name="origin" required="" type="hidden" />
        </div>
              
        <div className="form-group">
            <label>Destination: </label> 
            <input className="form-control" id="to_places" placeholder="Enter a location" required /> 
            <input id="destination" name="destination" required="" type="hidden" />
        </div>
        <input className="btn btn-primary" type="submit" value="Calculate" />
      </form>
    </div>
  )
}

export default GoogleApiWrapper({
  apiKey: GOOGLE_MAPS_API_KEY
})(Trip);