import React from 'react';
import {Image, Divider} from 'semantic-ui-react'

const CarImages = (props) => {
  return (
    <div>{
      props.images.map(image => (
        <div key={image}>{
          <div>
            <Image src={image} size='medium' /> 
            <Divider />
          </div>
        }</div>
      ))
    }</div>
  );
};

export default CarImages;
