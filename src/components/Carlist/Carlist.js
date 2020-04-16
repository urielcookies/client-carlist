import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Button, Dimmer, Loader, Table} from 'semantic-ui-react'

import {fetchCars, fetchOtherUsersCars} from '../../endpoints';

const CarList = (props) => {
  const {history, match} = props;
  const [carsList, setCarList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const {userId} = match.params;

  useEffect(() => {
    if (userId)
      fetchOtherUsersCars({isLoading, setIsLoading, setCarList, userId});
    else 
      fetchCars({isLoading, setIsLoading, setCarList})
  }, [isLoading]);


  const carListOwner = !userId;

  return (
    <div style={{minHeight: '80vh'}}>

      {carListOwner && (
        <Button
          fluid
          content='Add New Car'
          color="teal"
          basic
          onClick={() => history.push('/home/mycarlist/addcar')} />
      )}

      {/* <Dropdown
        fluid
        selection
        defaultValue={carSortingOPtions[0].value}
        options={carSortingOPtions}
        onChange={filterHandler}
      /> */}

      {
        isLoading
        ? <Dimmer active inverted page>
            <Loader inverted>Loading</Loader>
          </Dimmer>
        : (carsList.length ? 
          <Table unstackable basic striped compact="very" columns="5">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Year</Table.HeaderCell>
                <Table.HeaderCell>Brand</Table.HeaderCell>
                <Table.HeaderCell>Model</Table.HeaderCell>
                <Table.HeaderCell>View Details</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {carsList.map((car) => (
                <Table.Row key={car.Id}>
                  <Table.Cell>{car.Year}</Table.Cell>
                  <Table.Cell>{car.Brand}</Table.Cell>
                  <Table.Cell>{car.Model}</Table.Cell>
                    <Table.Cell>
                      <Link to={`/home/${userId ? 'carlist' : 'mycarlist'}/${car.UserAccountId}/${car.Id}/info`}>
                        <Button basic color='teal' icon='clipboard outline' fluid compact />
                      </Link>
                    </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          : null)
      }
    </div>
  );
};

// const carSortingOPtions = [
//   {
//     key: 0,
//     text: 'Active Cars',
//     value: 'active',
//   },
//   {
//     key: 1,
//     text: 'Sold Cars',
//     value: 'sold',
//   },
//   {
//     key: 2,
//     text: 'All Cars',
//     value: 'all',
//   },
// ];

export default CarList;
