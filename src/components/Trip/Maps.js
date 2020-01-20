import React, {useState} from 'react';
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  DirectionsRenderer
} from "react-google-maps";

const Maps = (props) => {
  const {
    google,
    destinationLatLng,
    originLatLng,
    setDirections,
    directions
  } = props;

  const [currentLocation, setCurrentLocation] = useState(null);

  const StaticMap = withGoogleMap(() => {
    navigator.geolocation.getCurrentPosition(position => setCurrentLocation(position.coords));

    if (originLatLng && destinationLatLng) {
      const DirectionsService = new google.maps.DirectionsService();
      DirectionsService.route({
        origin: new google.maps.LatLng(originLatLng.lat, originLatLng.lng),
        destination: new google.maps.LatLng(destinationLatLng.lat, destinationLatLng.lng),
        travelMode: google.maps.TravelMode.DRIVING,
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK ) {
          setDirections(result);
        }
      });
    }

    const defaultZoom = (currentLocation ? 15 : 6);
    const coordinates = (
      currentLocation
      ? {lat: currentLocation.latitude, lng: currentLocation.longitude}
      : {lat: 34.292965, lng: -111.664696 }
    );
  
    const currentComponentRender = (
      !Object.keys(directions).length
      ? (currentLocation ? <Marker position={coordinates} /> : <div></div>)
      : <DirectionsRenderer directions={directions} />
    );

    return (
      <GoogleMap 
        defaultZoom={defaultZoom}
        defaultCenter={(coordinates)} >
        {currentComponentRender}
      </GoogleMap>
    );
  });
  
  // dc - defaultCenter={{ lat: 34.292965, lng: -111.664696 }}
  // mk - position={{ lat: 35.08423, lng: -106.64905 }}
  return (
    <div>
      <StaticMap
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  )
}

export default Maps;