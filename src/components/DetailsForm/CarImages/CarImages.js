import React from 'react';

const CarImages = (props) => {
  return (
    <div>{
      props.images.map(image => (
        <li key={image}>{
          image 
        }</li>
      ))
    }</div>
  );
};

export default CarImages;
