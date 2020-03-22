import React from 'react';
import {Header, Icon, Table, Divider} from 'semantic-ui-react'
import {reduce} from 'lodash';
import numeral from 'numeral';

const Status = (props) => {
  const {carExpenses, carCost, PriceSold, Sold, YearSold} = props;
  const profit = reduce(carExpenses, (result, {Cost}) => result - Cost, PriceSold - carCost);

  return (
    <div>   
      <Divider horizontal>
        <Header as='h4'>
          <Icon name='bar chart' />
          Car Status
        </Header>
      </Divider>

      <Table definition unstackable>
        <Table.Body>
          <Table.Row>
            <Table.Cell textAlign="left" width={5}>Status</Table.Cell>
            <Table.Cell textAlign="center">
              {Sold ? 'Sold' : 'Not Sold'}
            </Table.Cell>
          </Table.Row>
          {Sold &&
            <React.Fragment>
              <Table.Row>
                <Table.Cell textAlign="left">Price Sold</Table.Cell>
                <Table.Cell textAlign="center">
                  {numeral(PriceSold).format('$0,0.00')}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell textAlign="left">Year Sold</Table.Cell>
                <Table.Cell textAlign="center">
                  {YearSold}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell textAlign="left">Profit</Table.Cell>
                <Table.Cell textAlign="center">
                  {profit}
                </Table.Cell>
              </Table.Row>
            </React.Fragment>
          }
        </Table.Body>
      </Table>
    </div>
  );
}

export default Status;
