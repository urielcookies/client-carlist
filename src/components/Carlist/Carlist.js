import React, {useState} from 'react';
// import {Link} from 'react-router-dom';
import {Image, Menu, Table} from 'semantic-ui-react'
// import {Redirect} from 'react-router-dom';

// import {fetchCars} from '../../endpoints';

const Home = (props) => {
  // const [isLoaded, setLoaded] = useState(false);
  // const [cars, setCarList] = useState([]);

  // useEffect(() => {
  //   fetchCars({isLoaded, setLoaded, setCarList});
  // }, [cars]);

  // console.log('cars', cars);

  // window.scrollTo(0, 0);
  // console.log(props);

  const {userId} = props.match.params;
  const [activeTable, setActiveTable] = useState('Active Cars');
  const handleItemClick = (e,{name}) => setActiveTable(name);

  return (
    <div style={{height: '80vh'}}>
      <Menu color='teal' widths={3}>
        <Menu.Item
          name='Active Cars'
          active={activeTable === 'Active Cars'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name='Sold Cars'
          active={activeTable === 'Sold Cars'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name='All Cars'
          active={activeTable === 'All Cars'}
          onClick={handleItemClick}
        />
      </Menu>

      <Table unstackable basic selectable sortable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Label</Table.HeaderCell>
            <Table.HeaderCell>Year</Table.HeaderCell>
            <Table.HeaderCell>Brand</Table.HeaderCell>
            <Table.HeaderCell>Model</Table.HeaderCell>
            <Table.HeaderCell>All Cost</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Image
              onClick={() => props.history.push(`/home/carlist/${userId}/1/info`)}
              src='https://4ever.blob.core.windows.net/cars/1/athumbnail_IMG_4452.jpg' size='mini' />
            </Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
//   return (
//     <Container textAlign="center">
//       {/* <Button color='green' size='large'><Link style={{color: 'white'}} to="/addcar">Add Car</Link></Button> */}
//       {/* <Button color='orange' size='large'><Link style={{color: 'white'}} to="/trip">Trip</Link></Button> */}
//       <Menu widths={2}>
//         <Menu.Item
//           style={{color: '#00b5ad'}}
//           name='Add Car'
//           onClick={() => props.history.push('addcar')}
//         />
//         <Menu.Item
//           style={{color: '#00b5ad'}}
//           name='Trip'
//           onClick={() => props.history.push('trip')}
//         />
//         {/* <Menu.Menu position='right'>
//           <Menu.Item>
//             <Input icon='search' placeholder='Search...' />
//           </Menu.Item>
//           <Menu.Item
//             name='logout'
//             onClick={this.handleItemClick}
//           />
//         </Menu.Menu> */}
//       </Menu>
//       <Divider />
//       {cars && cars.map((car) => (
//         <Card key={car.id} centered style={{display: 'inline-block', marginLeft: '15px', marginRight: '15px'}}>
//           <Image style={{height: '200px', width: '100%'}} src={car.images[0]} />
//           <Card.Content>
//             <Card.Header>{car.year} {car.brand} {car.model}</Card.Header>
//           </Card.Content>
//           <Card.Content extra>
//           <Button disabled color='teal' size='large' floated='left'>Images</Button>
//           <Button color='blue' size='large' floated='right'><Link style={{color: 'white'}} to={`/details/${car.id}/info`}>Details</Link></Button>
//           </Card.Content>
//         </Card>
//       ))}

// {/* 
//       <Card centered style={{display: 'inline-block', marginLeft: '15px', marginRight: '15px'}}>
//         <Image style={{height: '200px', width: '100%'}} src='https://www.usautosblog.com/wp-content/uploads/2018/09/2019-nissan-maxima.jpg' />
//         <Card.Content>
//           <Card.Header>Year Brand Model</Card.Header>
//         </Card.Content>
//         <Card.Content extra>
//         <Button color='teal' size='large' floated='left'>Images</Button>
//         <Button color='blue' size='large' floated='right'><Link style={{color: 'white'}} to={`/details/${2}`}>Details</Link></Button>
//         </Card.Content>
//       </Card>

//       <Card centered style={{display: 'inline-block', marginLeft: '15px', marginRight: '15px'}}>
//         <Image style={{height: '200px', width: '100%'}} src='https://carpreviewandrumors.com/wp-content/uploads/2017/10/2019-jeep-grand-cherokee-exterior-image.jpg' />
//         <Card.Content>
//           <Card.Header>Year Brand Model</Card.Header>
//         </Card.Content>
//         <Card.Content extra>
//         <Button color='teal' size='large' floated='left'>Images</Button>
//         <Button color='blue' size='large' floated='right'><Link style={{color: 'white'}} to={`/details/${3}`}>Details</Link></Button>
//         </Card.Content>
//       </Card> */}
//     </Container>
//   );
};

//Tabs
  // Car Info
  // ROI
  // Images

export default Home;