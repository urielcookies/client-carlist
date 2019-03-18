import React, {useState, useEffect} from 'react';
import { Input, Form, Label, Table } from 'semantic-ui-react'

import AutoCompleteSearch from './AutoCompleteSearch';

const CalculateTrip = (props) => {
  const {
    setOriginLatLng,
    setDestinationLatLng,
    setDirections,
    google,
    directions
  } = props;

  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  const [distance, setDistance] = useState('N/A');
  const [duration, setDuration] = useState('N/A');
  const [tripCost, setTripCost] = useState('N/A');
  const [roundTripCost, setRoundTripCost] = useState('N/A');

  const [mpg, setMpg] = useState(0);
  const [gasPrice, setGasPrice] = useState(0);

  useEffect(() => {
    if (mpg && gasPrice && directions) {
      const result = ((Number(distance.replace('miles', '')) / mpg) * gasPrice).toFixed(2);
      setTripCost(`$${result}`);
      setRoundTripCost(`$${result * 2}`);
    }
  });

  const reset = () => {
    setDistance('N/A');
    setDuration('N/A');
    setTripCost('N/A');
    setRoundTripCost('N/A');
  }
  const originProps = {
    address: origin,
    setAddress: setOrigin,
    label: 'origin',
    setLatLng: setOriginLatLng,
    setDirections,
    reset
  }

  const destinationProps = {
    address: destination,
    setAddress: setDestination,
    label: 'destination',
    setLatLng: setDestinationLatLng,
    setDirections: setDirections,
    reset
  }

  const getDistance = (result) => {
    if (result.status === 'OK') {
      setDistance((result.distance.text).replace('mi', 'miles'))
      setDuration(result.duration.text)
    }
  };

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
  
  const mpgChangeHandler = (event) => {
    if (Number(event.target.value)) {
      setMpg(Number(event.target.value));
    }
    if (event.target.value === '') {
      console.log('???');
      setMpg(0);
      setTripCost('N/A');
    }
  }

  const costOfGasChangeHandler = (event) => {
    if (Number(event.target.value)) {
      setGasPrice(Number(event.target.value));
    }
    if (event.target.value === '') {
      setGasPrice(0);
      setTripCost('N/A');
    }
  }

  return (
    <div>
      <Form>
        <Form.Group widths='equal'>
          <Form.Field>
            <label htmlFor="origin">Origin</label>
            <AutoCompleteSearch {...originProps} />
          </Form.Field>
          <Form.Field>
            <label htmlFor="destination">Destination</label>
            <AutoCompleteSearch {...destinationProps} />
          </Form.Field>
          <Form.Field>
            <label htmlFor="mpg">Vehicle's Miles Per Gallon</label>
            <Input labelPosition='right' type='number' placeholder='Ex. 16.5'>
              <Label basic>$</Label>
              <input id="mpg" onChange={mpgChangeHandler} />
              <Label>MPG</Label>
            </Input>
          </Form.Field>
          <Form.Field>
            <label htmlFor="model">Cost of Gas</label>
            <Input labelPosition='right' type='number' placeholder='Ex. $2.75'>
              <Label basic>$</Label>
              <input onChange={costOfGasChangeHandler} />
              <Label>per gallon</Label>
            </Input>
          </Form.Field>
        </Form.Group>
      </Form>

      {
        <Table basic='very' unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Time</Table.HeaderCell>
              <Table.HeaderCell>Miles</Table.HeaderCell>
              <Table.HeaderCell>Cost of Trip</Table.HeaderCell>
              <Table.HeaderCell>Round Trip</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>{duration}</Table.Cell>
              <Table.Cell>{distance}</Table.Cell>
              <Table.Cell>{tripCost}</Table.Cell>
              <Table.Cell>{roundTripCost}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      }
    </div>

  );
}

export default CalculateTrip;
