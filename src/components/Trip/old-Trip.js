import React, {useState} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'
import { Table, Input, Divider, Icon, Header, Button, Container, Placeholder} from 'semantic-ui-react'

import PlacesAutocomplete, { geocodeByAddress, geocodeByPlaceId, getLatLng } from 'react-places-autocomplete'
import Maps from './Maps';
import AutoCompleteSearch from './AutoCompleteSearch';
// const GOOGLE_MAPS_API_KEY = 'AIzaSyCd_KjCpZJ2F2vBc67F_bsXdHEWZCv6tyk';
const GOOGLE_MAPS_API_KEY = 'AIzaSyALNBMQO5NYknt41ZSwIm-YUhacDAQ7x28';


const Trip = (props) => {
  // add input listeners
  const {
    posts,
    latitude,
    longitude,
    google
  } = props;

  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  const [originLatLng, setOriginLatLng] = useState(null);
  const [destinationLatLng, setDestinationLatLng] = useState(null);

  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');

  if (origin.length && destination.length) {
    const service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
          origins: [origin],
          destinations: [destination],
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.IMPERIAL, // miles and feet.
          // unitSystem: google.maps.UnitSystem.metric, // kilometers and meters.
          avoidHighways: false,
          avoidTolls: false
      }, (result => getDistance(result.rows[0].elements[0])));
  }



  // var directionsDisplay = new google.maps.DirectionsRenderer();
  // // var map = new google.maps.Map(document.getElementById('map'), {
  // //   zoom: 7,
  // //   center: {lat: 41.85, lng: -87.65}
  // // });
  // // directionsDisplay.setMap(map);
  // console.log('directionsDisplay', directionsDisplay);
  // const directionsService = new google.maps.DirectionsService();
  // directionsService.route({
  //   origin: 'Los Angeles, CA, USA',
  //   destination: 'Albuquerque, NM, USA',
  //   travelMode: 'DRIVING'
  // }, function(response, status) {
  //   console.log('response huh', response);
  //   if (status === 'OK') {
  //     // directionsDisplay.setDirections(response);
  //   } else {
  //     window.alert('Directions request failed due to ' + status);
  //   }
  // }, (success) => console.log('success', success))

  const getDistance = (result) => {
    if (result.status === 'OK') {
      setDistance((result.distance.text).replace('mi', 'miles'))
      setDuration(result.duration.text)
    }
  };
  
  const originProps = {
    address: origin,
    setAddress: setOrigin,
    placeholder: 'Origin',
    setLatLng: setOriginLatLng
  }

  const destinationProps = {
    address: destination,
    setAddress: setDestination,
    placeholder: 'Destination',
    setLatLng: setDestinationLatLng
  }

  // directionsDisplay.setMap(
  //   <Map
  //   id="map"
  //   google={google}
  //   initialCenter={{
  //     lat: Number(34.05349),
  //     lng: Number(-118.24532)
  //   }}
  //   onClick={() => console.log('Clicked')}
  //   zoom={10} /> 
  // );
  console.log(originLatLng)
  console.log(destinationLatLng)
  return (
    <div>

      <div>
          <Maps
            google={google}
            originLatLng={originLatLng}
            destinationLatLng={destinationLatLng}
            />
        {/* <Map
          id="map"
          google={google}
          initialCenter={{
            lat: Number(34.05349),
            lng: Number(-118.24532)
          }}
          onClick={() => console.log('Clicked')}
          zoom={10} /> */}
      </div>


        {
          Boolean(origin.length && destination.length)
          &&
          <div>
            The trip will be {distance} and will take {duration}
          </div>
        }
        <div>
          <AutoCompleteSearch {...originProps} />
        </div>
        <br />
        <div>
          <AutoCompleteSearch {...destinationProps} />
        </div>





    </div>
  )
}

export default GoogleApiWrapper({
  apiKey: GOOGLE_MAPS_API_KEY
})(Trip);

Boolean(`
<PlacesAutocomplete
value={address}
onChange={handleChange}
onSelect={handleSelect}
>
{({ getInputProps, suggestions, getSuggestionItemProps }) => (
  <div>
    <Input
      icon
      {...getInputProps({
        placeholder: 'Search Places ...',
        className: 'location-search-input'
      })}
    />
    {
      address.length > 0 
      &&
      <Button size="small" circular icon="delete" onClick={handleCloseClick} />
    }
    <div>
      {suggestions.map(suggestion => {
        const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
        return (
          /* eslint-disable react/jsx-key */
          <div style={{marginTop: '8px'}}
            {...getSuggestionItemProps(suggestion, { className })}
          >
            <strong>
              {suggestion.formattedSuggestion.mainText}
            </strong>{' '}
            <small>
              {suggestion.formattedSuggestion.secondaryText}
            </small>
          </div>
        );
      })}
    </div>
  </div>
)}
</PlacesAutocomplete>
`)