import React from 'react';
import { Button, Card, Container, Divider, Image } from 'semantic-ui-react'

const Home = () => (
  <Container textAlign="center" style={{ marginTop: '7em' }}>
    <Button color='green' size='large'>Add Car</Button>
    <Divider />
    <Card centered style={{display: 'inline-block', marginLeft: '15px', marginRight: '15px'}}>
      <Image style={{height: '200px', width: '100%'}} src='http://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAvyJc3.img' />
      <Card.Content>
        <Card.Header>Year Brand Model</Card.Header>
      </Card.Content>
      <Card.Content extra>
      <Button color='teal' size='large' floated='left'>Images</Button>
      <Button color='blue' size='large' floated='right'>Details</Button>
      </Card.Content>
    </Card>

    <Card centered style={{display: 'inline-block', marginLeft: '15px', marginRight: '15px'}}>
      <Image style={{height: '200px', width: '100%'}} src='https://www.usautosblog.com/wp-content/uploads/2018/09/2019-nissan-maxima.jpg' />
      <Card.Content>
        <Card.Header>Year Brand Model</Card.Header>
      </Card.Content>
      <Card.Content extra>
      <Button color='teal' size='large' floated='left'>Images</Button>
      <Button color='blue' size='large' floated='right'>Details</Button>
      </Card.Content>
    </Card>

    <Card centered style={{display: 'inline-block', marginLeft: '15px', marginRight: '15px'}}>
      <Image style={{height: '200px', width: '100%'}} src='https://carpreviewandrumors.com/wp-content/uploads/2017/10/2019-jeep-grand-cherokee-exterior-image.jpg' />
      <Card.Content>
        <Card.Header>Year Brand Model</Card.Header>
      </Card.Content>
      <Card.Content extra>
      <Button color='teal' size='large' floated='left'>Images</Button>
      <Button color='blue' size='large' floated='right'>Details</Button>
      </Card.Content>
    </Card>
  </Container>
);

//Tabs
  // Car Info
  // ROI
  // Images

export default Home;