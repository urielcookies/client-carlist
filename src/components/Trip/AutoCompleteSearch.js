import React, {useState} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'
import { Table, Input, Divider, Icon, Header, Button, Container} from 'semantic-ui-react'

import PlacesAutocomplete, { geocodeByAddress, geocodeByPlaceId, getLatLng } from 'react-places-autocomplete'


const AutoCompleteSearch = (props) => {
  const {
    label,
    address,
    setAddress,
    setLatLng,
    setDirections,
    reset
  } = props;
  
  const handleChange = (addressx) => {
    setAddress(addressx)
    if (addressx === '') {
      setLatLng(null)
      setDirections({})
      reset();
    }
  }

  const handleSelect = (addressz) => {
    if (address !== addressz) {
      setAddress(addressz)
        geocodeByAddress(addressz)
        .then(results => getLatLng(results[0]))
        .then(latLng => setLatLng(latLng))
        .catch(error => console.error('Error', error))
    }
  }

  const handleCloseClick = () => {
    setAddress('');
  }
  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps }) => (
          <div>
            <Input
              id={label}
              fluid
              icon
              {...getInputProps({
                className: 'location-search-input'
              })}
            />
            {/* {
              address.length > 0 
              &&
              <Button size="small" circular icon="delete" onClick={handleCloseClick} />
            } */}
            <div  style={{position: 'absolute', zIndex:'1', backgroundColor: 'white', borderRadius: '5px', borderLeft: '.5px solid black', borderRight: '.5px solid black', marginTop:'3px', paddingLeft:'10px', paddingRight:'10px'}}>
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
    </div>
  )
}

export default AutoCompleteSearch;