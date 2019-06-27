import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { Button, Card, Container, Divider, Image } from 'semantic-ui-react'
import {Redirect} from 'react-router-dom';

import {fetchCars} from '../../endpoints';

const Home = () => {
  const [isLoaded, setLoaded] = useState(false);
  const [cars, setCarList] = useState([]);

  useEffect(() => {
    document.querySelector('#root > div > div.ui.inverted.top.fixed.menu > div > span > a').style.display = 'inline';
    fetchCars({isLoaded, setLoaded, setCarList});
  }, [cars]);

  console.log('cars', cars);

  if (!JSON.parse(localStorage.getItem('authenticated'))) {
    return <Redirect to="/" />;
  }

  window.scrollTo(0, 0);

  return (
    <Container textAlign="center">
      <Button color='green' size='large'><Link style={{color: 'white'}} to="/addcar">Add Car</Link></Button>
      <Button color='orange' size='large'><Link style={{color: 'white'}} to="/trip">Trip</Link></Button>
      <Divider />
      {cars && cars.map((car) => (
        <Card key={car.id} centered style={{display: 'inline-block', marginLeft: '15px', marginRight: '15px'}}>
          <Image style={{height: '200px', width: '100%'}} src={car.images[0]} />
          <Card.Content>
            <Card.Header>{car.year} {car.brand} {car.model}</Card.Header>
          </Card.Content>
          <Card.Content extra>
          <Button color='teal' size='large' floated='left'>Images</Button>
          <Button color='blue' size='large' floated='right'><Link style={{color: 'white'}} to={`/details/${car.id}`}>Details</Link></Button>
          </Card.Content>
        </Card>
      ))}

{/* 
      <Card centered style={{display: 'inline-block', marginLeft: '15px', marginRight: '15px'}}>
        <Image style={{height: '200px', width: '100%'}} src='https://www.usautosblog.com/wp-content/uploads/2018/09/2019-nissan-maxima.jpg' />
        <Card.Content>
          <Card.Header>Year Brand Model</Card.Header>
        </Card.Content>
        <Card.Content extra>
        <Button color='teal' size='large' floated='left'>Images</Button>
        <Button color='blue' size='large' floated='right'><Link style={{color: 'white'}} to={`/details/${2}`}>Details</Link></Button>
        </Card.Content>
      </Card>

      <Card centered style={{display: 'inline-block', marginLeft: '15px', marginRight: '15px'}}>
        <Image style={{height: '200px', width: '100%'}} src='https://carpreviewandrumors.com/wp-content/uploads/2017/10/2019-jeep-grand-cherokee-exterior-image.jpg' />
        <Card.Content>
          <Card.Header>Year Brand Model</Card.Header>
        </Card.Content>
        <Card.Content extra>
        <Button color='teal' size='large' floated='left'>Images</Button>
        <Button color='blue' size='large' floated='right'><Link style={{color: 'white'}} to={`/details/${3}`}>Details</Link></Button>
        </Card.Content>
      </Card> */}
    </Container>
  );
};

//Tabs
  // Car Info
  // ROI
  // Images

export default Home;