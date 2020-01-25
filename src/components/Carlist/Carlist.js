import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
// import {Link} from 'react-router-dom';
import {Button, Dimmer, Dropdown, Image, Loader, Menu, Table} from 'semantic-ui-react'
// import {Redirect} from 'react-router-dom';

import {fetchCars, fetchOtherUsersCars} from '../../endpoints';
// import {fetchCars} from '../../endpoints';

const CarList = (props) => {
  const [activeTable, setActiveTable] = useState('Active Cars');
  const [carsList, setCarList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const filterHandler = (e, {value}) => setActiveTable(value);

  useEffect(() => {
    const {userId} = props.match.params;
    if (userId)
      fetchOtherUsersCars({isLoading, setIsLoading, setCarList, userId});
    else 
      fetchCars({isLoading, setIsLoading, setCarList})
  }, [activeTable]);

  console.log('carsList', carsList);
  return (
    <div style={{height: '80vh'}}>

      <Dropdown
        fluid
        selection
        defaultValue={carSortingOPtions[0].value}
        options={carSortingOPtions}
        onChange={filterHandler}
      />

      {
        isLoading
        ? <Dimmer active inverted page>
            <Loader inverted>Loading</Loader>
          </Dimmer>
        : <Table unstackable basic striped sortable compact="very" columns="5">
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
                      <Link to={`/home/carlist/${car.UserAccountId}/${car.Id}/info`}>
                        <Button basic color='teal' icon='clipboard outline' fluid compact />
                      </Link>
                    </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
      }
    </div>
  );
};

const carSortingOPtions = [
  {
    key: 0,
    text: 'Active Cars',
    value: 'active',
  },
  {
    key: 1,
    text: 'Sold Cars',
    value: 'sold',
  },
  {
    key: 2,
    text: 'All Cars',
    value: 'all',
  },
];

export default CarList;
