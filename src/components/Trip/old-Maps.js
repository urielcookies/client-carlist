import React, {useState, useEffect} from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  DirectionsRenderer
} from "react-google-maps";
import { SearchResults } from 'semantic-ui-react';

const Maps = (props) => {
  const {
    google,
    originLatLng,
    destinationLatLng,

  } = props;

  const [directions, setDirections] = useState({});
  const [currentLocation, setCurrentLocation] = useState({});

  const MapWithAMarker = withGoogleMap((props) => {
    if (originLatLng && destinationLatLng) {
      const DirectionsService = new google.maps.DirectionsService();
      DirectionsService.route({
        origin: new google.maps.LatLng(originLatLng.lat, originLatLng.lng),
        destination: new google.maps.LatLng(destinationLatLng.lat, destinationLatLng.lng),
        travelMode: google.maps.TravelMode.DRIVING,
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK ) {
          console.log('Direction Search Results', result)
          setDirections(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      });
    }
        navigator.geolocation.getCurrentPosition(position => setCurrentLocation(position.coords));
        // console.log('currentLocation', currentLocation);
        console.log('latitude', currentLocation.latitude )
        console.log('longitude', currentLocation.longitude )
        console.log('Object.keys(directions).length', Object.keys(directions).length )
        const mapComponent = (
          !Object.keys(directions).length
          ? <Marker position={{ lat: currentLocation.latitude, lng: currentLocation.longitude }} />
          : <DirectionsRenderer directions={directions} />
        );
    return (
      <GoogleMap
        defaultZoom={(currentLocation ? 15 : 4)}
        // defaultCenter={{ lat: 34.292965, lng: -111.664696 }}
        defaultCenter={{ lat: (currentLocation ? currentLocation.latitude : 34.292965), lng: (currentLocation ? currentLocation.longitude : -111.664696) }}

      >
        {/* {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />} */}
        {/* {directions && <DirectionsRenderer directions={directions} />} */}
        {mapComponent}
        {/* <Marker position={{ lat: currentLocation.latitude, lng: currentLocation.longitude }} /> */}
      </GoogleMap>
    );
  });


  return (
    <div>
      <MapWithAMarker
        // googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyALNBMQO5NYknt41ZSwIm-YUhacDAQ7x28&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  )
}

export default Maps;
