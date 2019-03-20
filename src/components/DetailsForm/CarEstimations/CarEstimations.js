import React, {useState} from 'react';
import { Table, Input, Divider, Icon, Header} from 'semantic-ui-react'

const CarEstimations = (props) => {
  const {
    cost,
    expenses
  } = props;

  const [estimateProfit, setEstimateProfit] = useState(0);
  const [halfed, setHalfed] = useState(0);
  const [roi, setROI] = useState(0);

  const totalInvestment = expenses.reduce((result, record) => {
    return result + Number(record.cost)
  }, 0) + Number(cost);

  const expense = expenses.reduce((result, record) => {
    return result + Number(record.cost)
  }, 0)

  const changeHandler = (event) => {
    if (Number(event.target.value)) {
      const input = Number(event.target.value);
      setEstimateProfit(
        input - totalInvestment
      );
      setHalfed(
        (input - totalInvestment) / 2
      );
      setROI(
        (((input - totalInvestment) / totalInvestment) * 100).toFixed(2)
      )
    } else {
      setEstimateProfit(0)
      setHalfed(0)
      setROI(0)
    }
  };

  return (
    <div>
      <Divider horizontal>
        <Header as='h4'>
          <Icon name='bar chart' />
          Car Data
        </Header>
      </Divider>

      <Table definition>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Vehicle Cost</Table.Cell>
            <Table.Cell>{cost}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Expenses</Table.Cell>
            <Table.Cell>{expense}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Total Cost</Table.Cell>
            <Table.Cell>{totalInvestment}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>

      <Divider horizontal>
        <Header as='h4'>
          <Icon name='calculator' />
          Estimates
        </Header>
      </Divider>

      <Table definition>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Estimate Profit</Table.Cell>
            <Table.Cell positive={(estimateProfit > 0)} negative={(estimateProfit < 0)}>{estimateProfit}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Halfed</Table.Cell>
            <Table.Cell positive={(halfed > 0)} negative={(halfed < 0)}>{halfed}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Return of Investment</Table.Cell>
            <Table.Cell positive={(roi > 0)} negative={(roi < 0)}>{roi}%</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Estimate Sale</Table.Cell>
            <Table.Cell><Input type="number" onChange={changeHandler} /></Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  )
}

export default CarEstimations;
