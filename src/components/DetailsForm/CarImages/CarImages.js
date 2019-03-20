import React, {useState} from 'react';
import {Image, Divider, Card} from 'semantic-ui-react'

const CarImages = (props) => {
  return (
    <Card.Group stackable itemsPerRow={3}>{
      props.images.map((image) => (
        <Card color='teal' key={image} raised image={image} />
      ))
    }</Card.Group>
  );
};

export default CarImages;
